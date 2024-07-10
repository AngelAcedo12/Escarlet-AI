import { MLCEngine, ServiceWorkerMLCEngineHandler } from "@mlc-ai/web-llm";
import { init } from "next/dist/compiled/webpack/webpack";


const CACHE_NAME = 'v1';
const RESOURCES_TO_PRECACHE = [
  '/',
  ];

let handler : ServiceWorkerMLCEngineHandler


self.addEventListener("message", (event) => {
  if (!handler) {
    handler = new ServiceWorkerMLCEngineHandler();
   
  }
});

self.addEventListener('activate',(event) => {
  if(!handler){
    handler = new ServiceWorkerMLCEngineHandler()
  }
})

self.addEventListener("install", function (event : any) {
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(RESOURCES_TO_PRECACHE);
      })
  );

});
self.addEventListener("fetch", function (event : any) {
 
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});



