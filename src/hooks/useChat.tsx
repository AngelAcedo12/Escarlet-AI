import { Message } from "@/interfaces/message";
import * as webllm from "@mlc-ai/web-llm";
import { CreateMLCEngine, InitProgressReport } from "@mlc-ai/web-llm";
import { useEffect, useState } from "react";

const selectedModel = "gemma-2b-it-q4f16_1-MLC-1k";
let engine: webllm.MLCEngine | null = null!;
/**
 * Progress of the initialization of the engine
 */

const useChat = () => {
    
    const [progress, setProgress] = useState("0.00%");  
    const [statusText , setStatusText] = useState("");
    const [progressInit, setProgressInit] = useState(0);
    const [reply, setReply] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [generateMessage, setGenerateMessage] = useState(false);
    
    
    useEffect(() => {
        
    }, [])


    const userRequest = async(text: string) => {
        if(engine){
        
            let request : webllm.ChatCompletionRequestStreaming = {
                messages: [
                    {
                        role: "user",
                        content: text,
                     
                    }
                ],
                stream: true
            };

            setGenerateMessage(true);
            setMessages((oldMessages) => [...oldMessages, {text: text, user: "user"}]);
            let response : AsyncIterable<webllm.ChatCompletionChunk> = await engine.chat.completions.create(request)
            let botMessage = "";
            for await (const chunk of response) {
                const [choices] = chunk.choices;
                const content = choices.delta.content ?? "";
                botMessage += content;
              
                setReply((oldContent) => oldContent+= content);
            }  
            setGenerateMessage(false);
            addMessage({text: botMessage, user: "bot"});
            
        }


    }   

    const initProgressCallback = (progress: InitProgressReport) => {
        getProggest(progress.progress);
        setStatusText(progress.text);
    }
    
    const getProggest = (valueProgress: number) => {
        let progress = valueProgress  * 100;
        setProgress(progress.toFixed(2) + '%');
        setProgressInit(valueProgress);
    }

    async function initChat(){
        console.log("initChat")
        engine = await CreateMLCEngine(
              selectedModel,
              { initProgressCallback: initProgressCallback }, // engineConfig
            
        );
       
      }

    function addMessage(message: Message){
        setMessages((oldMessages) => [...oldMessages, message]);
    }

    function isCompatible(){
        if (typeof window !== 'undefined') {
            if ((navigator as any).gpu) {
                return true;
            } else {
                return false;
            }
        }
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
        isCompatible
    }
}





export {
    useChat,
    selectedModel,
    engine,
    
}