import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm"

const handler = new WebWorkerMLCEngineHandler()

self.onmessage = msg => {
    console.log(msg)
    handler.onmessage(msg)
    
}