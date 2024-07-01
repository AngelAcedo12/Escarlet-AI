
import { isMobile } from "@/constants/mobile";
import { Message } from "@/interfaces/message";
import * as webllm from "@mlc-ai/web-llm";
import { CreateMLCEngine, InitProgressReport } from "@mlc-ai/web-llm";
import { count } from "console";
import { act, useEffect, useRef, useState } from "react";
import { URL } from "url";

/**
 * Progress of the initialization of the engine
 */

function useChat  ()  {
    let selectedModel = "";
    const [engine, setEngine] = useState<webllm.WebWorkerMLCEngine>();
    const [progress, setProgress] = useState("0.00%");
    const [statusText, setStatusText] = useState("");
    const [progressInit, setProgressInit] = useState(0);
    const [reply, setReply] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [generateMessage, setGenerateMessage] = useState(false);
    const [initialization, setInitialization] = useState(false);
    const [inGeneratedMessage, setInGeneratedMessage] = useState(false);
    const initEngineWorkerRef = useRef<Worker>();
    let countEnter = 0


    useEffect(() => {
       if (typeof window !== 'undefined'){
           selectedModel = determineModel();
       }
    }, [])



    const userRequest = async (text: string) => {
        
       
        if (engine) {
            console.log(messages)
            let actualMessage = messages.map((message, index) : webllm.ChatCompletionMessageParam  |  webllm.ChatCompletionSystemMessageParam  => {
                if(index == 0 ){
                    return {
                        role: "system",
                        content: "Te llamas Escarlet y eres un asistente virtual el cual habla en Español",
                        
                    }
                }
                if(message.user == "bot"){
                    return {
                        role: "assistant",
                        content: message.text,
                    }
                }else{
                    return {
                        role: "user",
                        content: message.text,
                    }
                }
               
            })  
            actualMessage.push({
                role : "user",
                content : text,
                name : "User"
            })
       
            setGenerateMessage(true);
            let request: webllm.ChatCompletionRequestStreaming = {
                messages: actualMessage,
                stream: true,
            };
            
            let response: AsyncIterable<webllm.ChatCompletionChunk> = await engine.chat.completions.create(request)
            let botMessage = "";
            for await (const chunk of response) {
                const [choices] = chunk.choices;
                const content = choices.delta.content ?? "";
                botMessage += content;

                setReply((oldContent) => oldContent += content);
            }
            setGenerateMessage(false);
            addMessage({ text: botMessage, user: "bot", name: "Escarlet" });
            setReply("");
        }


    }

    const initProgressCallback = (progress: InitProgressReport) => {
       
        getProggest(progress.progress);
        setStatusText(progress.text);
        if (progress.progress == 1) {
            setInitialization(true);
        }
    }

    const getProggest = (valueProgress: number) => {

        let progress = valueProgress * 100;
        setProgress(progress.toFixed(2) + '%');
        setProgressInit(valueProgress);
    }

    async function initChat() {


        if (window.Worker) {

            if (initEngineWorkerRef.current) {
              
                initEngineWorkerRef.current.postMessage({ type: 'init' })
                let engine = await webllm.CreateWebWorkerMLCEngine(
                    initEngineWorkerRef.current,
                    selectedModel,
                    { initProgressCallback: initProgressCallback }, 
                    
                )
                setEngine(engine);
            }
        }
    }

    function addMessage(message: Message) {
        setMessages((oldMessages) => [...oldMessages, message]);
    }

    function isCompatible() {

        if ((navigator as any).gpu) {
            return true;
        } else {
            return false;
        }

    }

    const determineModel =  () =>{
        
        return  isMobile() == "MOBILE" ? "stablelm-2-zephyr-1_6b-q4f16_1-MLC-1k" : "Llama-3-70B-Instruct-q3f16_1-MLC"
    }

    return {
        getProggest,
        progress,
        progressInit,
        initChat,
        statusText,
        userRequest,
        messages,
        generateMessage,
        reply,
        addMessage,
        isCompatible,
        initialization,
        initEngineWorkerRef,
        selectedModel,
        engine
    }
}





export {
    useChat,
  
}