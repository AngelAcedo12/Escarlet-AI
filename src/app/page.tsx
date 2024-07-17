"use client"
import Image from "next/image";
import Link from "next/link";
import ButtonLink from "./Components/buttonLink";
import { useEffect } from "react";
import DescargaIcon from "./Components/Icons/descarga_svg";
import PdfIcon from "./Components/Icons/pdf_icon";
import { useChat } from "./Components/hooks/useChat";
import Navbar from "./Components/navbar";
import InputChat from "./Components/inputChat";
import { ChatProvider } from "./Components/context/chatContext";
import Loader from "./Components/loader";
import GitHubIcon from "./Components/Icons/github";

export default function Home() {

  const chat = useChat();

  async function initServiceWorker() {
    if ('serviceWorker' in navigator) {
      console.info("Service Worker API is available and in use.");

      const registration = await navigator.serviceWorker.register(new URL('./sw.ts', import.meta.url),
        {
          type: 'module'
        }
      );

      registration.update();
      chat.initServiceWorker();
    }

  }


  useEffect(() => {
    if (typeof window !== 'undefined') {
      initServiceWorker();
    }
  }, []);


  return (
    <>

      <Navbar></Navbar>
      <main className="flex h-screen flex-col items-center justify-between   p-4   ">
        <section className="flex flex-col  align-middle items-center gap-10 justify-center animate-fade-up h-[80dvh] ">
          <h1 
            className="md:text-4xl text-2xl font-bold gradiant_text bg-gradient-to-r from-sky-500/20 animate-fade-up text-rose-500 to-sky-500/75  bg-clip-text">
            Bienvenido a Escarlet AI
          </h1>
          
            <InputChat redirect={true} route="./chat"></InputChat>
          {/* <ButtonLink href="/chat" text="Emperzar a chatear" className="border-rose-500 border rounded-full p-2  animate-fade-up hover:bg-white mt-10 hover:text-black transition-all " ></ButtonLink> */}
        </section>
        
        <section className="flex flex-row justify-start items-start">
          <div className="flex flex-row justify-start">
            <a className="p-2 hover:bg-zinc-800 rounded-lg transition-all" href="https://github.com/AngelAcedo12/Escarlet-IA">
              <GitHubIcon width={30} height={30} className="fill-rose-500"></GitHubIcon>
            </a>
          </div>
        </section>
   
      </main>
    </>

  );
}
