
import Image from "next/image";
import Link from "next/link";
import ButtonLink from "./Components/buttonLink";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-4 bg-white mt-20">
      <h1 className="text-4xl font-bold text-black mb-7">Welcome to Project Escarlet</h1>
      <div className="sm:flex gap-4  bg-slate-400 rounded-lg shadow-lg sm:flex-row flex-col block">
        <img
          src="/img/consultaPsicologia.webp"
          alt="Project Escarlet"
          className="w-full h-auto rounded-r-none rounded-lg sm:w-96 sm:h-96"

        />
        <div className="flex flex-col  p-4 justify-around gap-3 ">

          <p className=" text-balance max-w-96 text-slate-100 " >
            Project Escarlet es un projecto que busca ayudar a las personas a tener una vida más feliz y saludable gracias a la IA.
          </p>
          <ButtonLink href="/chat" text="Empecemos"></ButtonLink>
        </div>

      </div>
    </main>
  );
}
