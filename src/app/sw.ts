import { MLCEngine, ServiceWorkerMLCEngineHandler } from "@mlc-ai/web-llm";
import { init } from "next/dist/compiled/webpack/webpack";

const CACHE_NAME = 'v1';
const RESOURCES_TO_PRECACHE = [
  '/',
  ];

let handler : ServiceWorkerMLCEngineHandler

self.addEventListener('activate',(event) => {
  
  handler = new ServiceWorkerMLCEngineHandler();
  console.log("Handelr")
  console.log(handler)

})

self.addEventListener("install", function (event : any) {
    console.log("Hello world from the Service Worker 🤙");

    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          console.log(cache)
          return cache.addAll(RESOURCES_TO_PRECACHE);
        }).catch((error) => {
          console.log(error);
        }
        )
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

self.addEventListener("message", (event : any) => {
  console.log("Message")
  console.log(event)

})