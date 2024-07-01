// sw.ts
import { MLCEngine, ServiceWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

let handler: ServiceWorkerMLCEngineHandler;
let port: MessagePort;
const engine : MLCEngine = new MLCEngine();
self.addEventListener("activate", function (event) {
  handler = new ServiceWorkerMLCEngineHandler();
  
  console.log("Service Worker is ready");
  
});
self.addEventListener("message", function (event) {
    console.log(event)
    handler.onmessage(event);
    }
)