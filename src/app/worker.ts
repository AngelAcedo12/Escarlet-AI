import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm"

let handler : WebWorkerMLCEngineHandler  



self.onmessage = msg => {
    console.log(msg)
    if(!handler){
        handler = new WebWorkerMLCEngineHandler()
    }
    handler.onmessage(msg)
    
}

