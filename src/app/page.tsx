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

export default function Home() {

  const chat = useChat();

  async function initServiceWorker() {
    if ('serviceWorker' in navigator) {
    console.info("Service Worker API is available and in use.");

    const registration =await  navigator.serviceWorker.register(new URL('./sw.ts', import.meta.url),
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
    <main className="flex h-full flex-col items-center  mt-16  p-4   ">
      <section className="flex flex-col  align-middle items-center gap-10 justify-center animate-fade-up h-[80dvh] ">

        <h1 className="md:text-4xl text-2xl font-bold gradiant_text bg-gradient-to-r from-sky-500/20 animate-fade-up text-rose-500 to-sky-500/75  bg-clip-text  ">Bienvenido a Escarlet IA</h1>
        
        <InputChat redirect={true} route="./chat"></InputChat>
        {/* <ButtonLink href="/chat" text="Emperzar a chatear" className="border-rose-500 border rounded-full p-2  animate-fade-up hover:bg-white mt-10 hover:text-black transition-all " ></ButtonLink> */}
       
      </section>
      {/* <section className="h-[85dvh]  ">
          <article className="flex md:flex-row flex-col ustify-between text-center items-center  animate-fade-up   gap-7 bg-zinc-900 rounded-lg  shadow-slate-400 border border-zinc-500 p-5 md:p-10  ">

            <DescargaIcon height={200} className="fill-rose-500" ></DescargaIcon>

            <h1 className="md:text-3xl text-base ">Utiliza la IA de manera local. </h1>
          </article>
          <article className="flex md:flex-row flex-col  items-center  text-center mt-10 gap-7 justify-self-auto animate-fade-up bg-zinc-900 rounded-lg  shadow-slate-400 border border-zinc-500 p-5 md:p-10  ">

            <PdfIcon height={200} className="fill-rose-500" ></PdfIcon>

            <h1 className="md:text-3xl text-base ">Resume tus pdfs.</h1>
          </article>

      </section> */}
      <div className="h-20"></div>
    </main>
    </>

  );
}
