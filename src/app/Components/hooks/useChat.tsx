
import { Message } from "@/interfaces/message";
import * as webllm from "@mlc-ai/web-llm";
import { CreateMLCEngine, InitProgressReport } from "@mlc-ai/web-llm";
import { count } from "console";
import { useEffect, useRef, useState } from "react";
import { URL } from "url";

/**
 * Progress of the initialization of the engine
 */

const useChat = () => {
    const selectedModel = "gemma-2b-it-q4f32_1-MLC";
    let engine: webllm.WebWorkerMLCEngine | null = null!;
    const [progress, setProgress] = useState("0.00%");
    const [statusText, setStatusText] = useState("");
    const [progressInit, setProgressInit] = useState(0);
    const [reply, setReply] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { text: "Hola, me llamo Escarlet. ¿En que puedo ayudarte?", user: "bot", name: "Escarlet" }
    ]);
    const [generateMessage, setGenerateMessage] = useState(false);
    const [initialization, setInitialization] = useState(false);
    const [inGeneratedMessage, setInGeneratedMessage] = useState(false);
    const initEngineWorkerRef = useRef<Worker>();
    let countEnter = 0

    const userRequest = async (text: string) => {

        if (engine) {
       
            setGenerateMessage(true);
            let request: webllm.ChatCompletionRequestStreaming = {
                messages: [
                    {
                        role: "user",
                        content: text

                    }
                ],
                stream: true,
            };
            setMessages((oldMessages) => [...oldMessages, { text: text, user: "user", name: "User" }]);
        
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


        if (window.Worker && countEnter == 0) {
            if (initEngineWorkerRef.current) {
                countEnter++;
                initEngineWorkerRef.current.postMessage({ type: 'init' })
                engine = await webllm.CreateWebWorkerMLCEngine(
                    initEngineWorkerRef.current,
                    selectedModel,
                    { initProgressCallback: initProgressCallback }, 
                    
                )
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