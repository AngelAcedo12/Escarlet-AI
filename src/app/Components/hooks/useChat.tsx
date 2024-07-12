
import { isMobile, typesMobile } from "@/constants/mobile";
import { chatConversation } from "@/interfaces/conver";
import { Message } from "@/interfaces/message";
import formaterDate from "@/utils/dateFormater";
import * as webllm from "@mlc-ai/web-llm";
import { CreateMLCEngine, InitProgressReport } from "@mlc-ai/web-llm";
import { count } from "console";
import { randomInt } from "crypto";
import { act, useEffect, useRef, useState } from "react";
import { URL } from "url";

/**
 * Progress of the initialization of the engine
 */

function useChat() {
    let selectedModel = "";
    const [engine, setEngine] = useState<webllm.MLCEngineInterface>();
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("");
    const [progressInit, setProgressInit] = useState(0);
    const [reply, setReply] = useState("");
    const [message, setMessages] = useState<Message[]>([]);
    const [conversation, setConversation] = useState<chatConversation>();
    const [generateMessage, setGenerateMessage] = useState(false);
    const [initialization, setInitialization] = useState(false);
    const [mobile, setMobile] = useState("");
    const [modelInCache, setModelInCache] = useState(true);
    const initEngineWorkerRef = useRef<Worker>();

    let countInit = 0



    useEffect(() => {
        if (typeof window !== 'undefined') {
            selectedModel = determineModel();

            window.caches.keys().then((keys) => {
            
                if (keys.includes("webllm/config" || "webllm/model" || "webllm/wasm")) {
                    setModelInCache(true)
                }else{
                    setModelInCache(false)
                }
            
            })    
        }

        if (generateMessage == false && conversation != undefined) {
            saveConversations();
        }
    }, [generateMessage])



    const userRequest = async (text: string) => {

        if (engine) {
            let userRequest: webllm.ChatCompletionMessageParam | webllm.ChatCompletionSystemMessageParam =
            {
                role: "user",
                content: text,
                name: "User"
            }
            if (conversation == undefined) {
                console.log("Init conversation")
                initConversation(text)
            }
            let request: webllm.ChatCompletionRequestStreaming =await generateRequest(userRequest);

            setGenerateMessage(true);
            try{
                let response: AsyncIterable<webllm.ChatCompletionChunk> = await engine.chat.completions.create(request)
            
                for await (const chunk of response) {
                  
                    const [choices] = chunk.choices;
                    const content = choices.delta.content
                    if (content == "") {
                        continue;
                    } else {
    
                        setReply((oldContent) => oldContent += content);
                    }
    
                }
                const messageBot = await engine.getMessage().then((message) => message);
                addMessage({
                    text: messageBot,
                    user: "bot",
                    name: "bot"
                });
    
                setReply("");
    
            }catch(e){
                console.log(e)
                console.log(e instanceof Error)
                if(e instanceof Error){
                    addMessage({
                        text: "Error en la solicitud",
                        user: "bot",
                        name: "bot"
                    });
                }
                setReply("");
                setGenerateMessage(false);
               
            }
          
        }

       async function generateRequest(userRequest: webllm.ChatCompletionUserMessageParam) {
            let request: webllm.ChatCompletionRequestStreaming;

            if (mobile == typesMobile.DESKTOP) {
                // Se ha deshabilitado el contexto por ahora
                // let actualMessage = mapAllMessage();

                // actualMessage?.push(userRequest);
                
                request = {
                    messages: [userRequest],
                    stream: true,
                    response_format: {
                        type: "text",
                    } as webllm.ResponseFormat,
                    temperature: 0.5,
                };
            } else {
                request = {
                    messages: [userRequest],
                    stream: true,
                    response_format: {
                        type: "text",
                    } as webllm.ResponseFormat,

                    temperature: 0.5,
                };


            }
            return request;
        }
    }

    const initProgressCallback = (progress: InitProgressReport) => {
        getProggest(progress.progress);
        setStatusText(progress.text);
        if(progress.progress >0 && progress.progress < 1){
            setModelInCache(false)
        }
        if (progress.progress == 1) {
            setInitialization(true);

        }
    }

    const getProggest = (valueProgress: number) => {

        let progress = valueProgress * 100;
        setProgress(progress);
        setProgressInit(valueProgress);
    }

    async function initChat() {

        if (window.Worker) {

            if (initEngineWorkerRef.current && !initialization && countInit == 0) {

                countInit++


                let engine = await webllm.CreateWebWorkerMLCEngine(
                    initEngineWorkerRef.current,
                    selectedModel,
                    {
                        initProgressCallback: initProgressCallback,
                    },
                    {
                        conv_config: {
                            system_message: "Te llamas Escarlet y eres un asistente virtual el cual habla en Español",
                        },
                      
                    },

                ).then((engine) => {
                    return engine
                })
                setEngine(engine);
                setInitialization(true);

            }
        }
    }
    async function initServiceWorker() {

        determineModel();

        const engine = await webllm.CreateServiceWorkerMLCEngine(selectedModel,
            { initProgressCallback: initProgressCallback }
        );
        console.log(engine.modelId)
    }

    async function addMessage(input: Message) {

        let oldMessages = message;
        oldMessages.push(input);
        setMessages(oldMessages);
        setGenerateMessage(false);
        return true
    }


    function isCompatible() {

        if ((navigator as any).gpu) {
            return true;
        } else {
            return false;
        }

    }

    const determineModel = () => {
        let model = isMobile()
        setMobile(model)
        return model == "MOBILE" ? "stablelm-2-zephyr-1_6b-q4f16_1-MLC-1k" : "Phi-3-mini-4k-instruct-q4f16_1-MLC-1k"
    }

    const mapAllMessage = () => {
        return message.map((message, index): webllm.ChatCompletionMessageParam | webllm.ChatCompletionSystemMessageParam => {

            if (message.user == "bot") {
                if (index == 0) {
                    return {
                        role: "system",
                        content: "Eres un asistente llamado Escarlet, tienes que responder en Español",
                    }
                }
                return {
                    role: "assistant",
                    content: message.text,
                }
            } else {
                return {
                    role: "user",
                    content: message.text,
                }
            }

        })
    }

    function createId(date: Date) {
        const numberRandom = Math.floor(Math.random() * 9999);
        return '#' + date.getUTCFullYear() + date.getUTCMonth() + date.getUTCDay() + date.getUTCHours() + date.getUTCMinutes() + date.getUTCSeconds() + numberRandom
    }
    const initConversation = async (title: string) => {
        let date = new Date();
        const id = createId(date)
        const dateFormater = formaterDate(date)
        let conversation: chatConversation = {
            messages: message,
            date: dateFormater,
            title: title,
            id: id,
            new: true
        }

        setConversation(conversation)
        setGenerateMessage(false);
        setReply("");
    }

    const changeConversations = async (conversation: chatConversation) => {
        setConversation(conversation);
        setMessages(conversation.messages)
    }
    const saveConversations = async () => {
        if (window.localStorage) {


            let conversations: chatConversation[] = JSON.parse(window.localStorage.getItem("conversations") || "[]");
            let actualConversation = conversations.find((item) => item.id === conversation?.id);
            if (actualConversation == undefined && conversation != undefined) {
                conversations.push(conversation);
            } else {
                if (conversation != undefined) {
                    conversation.messages = message;
                    let index = conversations.findIndex((conversation) => conversation.id === conversation.id);
                    conversations[index] = conversation;
                }
            }
            window.localStorage.setItem("conversations", JSON.stringify(conversations))

        }
        return true
    }

    const newConversation = async () => {
        setConversation(undefined);
        setMessages([]);
        engine?.interruptGenerate()
       
    }
    return {
        progress,
        progressInit,
        initChat,
        statusText,
        userRequest,
        conversation,
        generateMessage,
        reply,
        addMessage,
        isCompatible,
        initialization,
        initEngineWorkerRef,
        selectedModel,
        engine,
        initServiceWorker,
        determineModel,
        initProgressCallback,
        initConversation,
        message,
        saveConversations,
        changeConversations,
        newConversation,
        modelInCache,
        mobile

    }

}





export {
    useChat,

}