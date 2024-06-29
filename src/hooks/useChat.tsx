import * as webllm from "@mlc-ai/web-llm";
import { CreateMLCEngine, InitProgressReport } from "@mlc-ai/web-llm";
import { useEffect, useState } from "react";

const selectedModel = "Llama-3-8B-Instruct-q4f32_1-MLC";
let engine = null;
/**
 * Progress of the initialization of the engine
 */

const useChat = () => {
    
    const [progress, setProgress] = useState("0.00%");  
    const [progressInit, setProgressInit] = useState(0);
    useEffect(() => {
        getProggest();
    }, [progressInit])


    const initProgressCallback = (progress: InitProgressReport) => {
        setProgressInit(progress.progress);
        console.log(progress.progress);
    }
    
    const getProggest = () => {
        let progress = progressInit  * 100;
        
        setProgress(progress.toFixed(2) + '%');
    }

    async function initChat(){
        engine = await CreateMLCEngine(
              selectedModel,
              { initProgressCallback: initProgressCallback }, // engineConfig
            );
      
      }

    return {
        getProggest,
        progress,
        progressInit,
        initChat
    }
}





export {
    useChat,
    selectedModel,
    engine,
    
}