"use client"
import Image from "next/image";
import Link from "next/link";
import ButtonLink from "./Components/buttonLink";
import { useEffect } from "react";

export default function Home() {

  async function initServiceWorker() {
    if ('serviceWorker' in navigator ) {
      
        const registration = await navigator.serviceWorker.register(new URL('./sw.ts', import.meta.url),
            {
                type: 'module'
            }
        );
        if (registration.installing) {
            console.log("Service worker installing");
        } else if (registration.waiting) {
            console.log("Service worker installed");
        } else if (registration.active) {
            console.log("Service worker active");
        }
        registration.update();
  
    }
  
  }


  useEffect(() => {
    if (typeof window !== 'undefined'){
      initServiceWorker();
    }
  }, []);


  return (
    <main className="flex min-h-screen flex-col items-center text-white  p-4  mt-20">
     
    </main>
  );
}
