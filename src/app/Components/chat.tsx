"use client"
import React, { use, useEffect, useState } from 'react'
import Messaje from './Messaje';
import Script from 'next/script';
import { useChat } from './hooks/useChat';
import { messageFormater } from '@/utils/messageFormater';

export default function Chat() {

    const chat = useChat();
    const [userMessageInput, setMessageInput] = useState<string>('');
    const [isCompatible, setIsCompatible] = useState<boolean>(true);
    const [register, setRegister] = useState<boolean>(false);


    function initWorket() {

        let worker = new Worker(
            new URL("../worker.ts", import.meta.url),
            { type: 'module' },
        );
        chat.initEngineWorkerRef.current = worker;

    }


    const detectedCompatibility = () => {
        const response = chat.isCompatible();
        return response;

    };

    useEffect(() => {
        if (typeof window !== 'undefined') {

            setIsCompatible(detectedCompatibility());
            if (isCompatible && !register) {
             
                initWorket()
                chat.initChat()
               
                setRegister(true);
            }
        }

    }, [])


    const handleUserMessage = (e: React.FormEvent<HTMLInputElement>) => {
        setMessageInput(e.currentTarget.value);
    }
    const handleUserMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (chat.generateMessage == false) {
            chat.addMessage({ text: userMessageInput, user: "user", name: "User" });
            chat.userRequest(userMessageInput);
            setMessageInput('');

        }
    }
    // Si el sistema no es compatible rederizara este componente
    if (!isCompatible) {
        return (

            <div className='h-full w-full '>
                <ul className=' flex flex-col'>
                    <p className='text-neutral-400 text-sm '>
                        Su navegador no es compatible con el modelo de lenguaje.
                    </p>
                </ul>
            </div>


        )
    }
    // Si el sistema esta en proceso de inicializacion renderizara este componente
    if (chat.initialization != true) {
        return (
            <>
                <div
                    style={
                        {
                            width: `${chat.progress}`
                        }
                    } className={` bg-rose-500 h-1 animate-pulse rounded-xl`}>

                </div>
                <div className='h-full w-full text-white '>
                    <ul className=' flex flex-col'>

                        <p className=' text-sm '>
                            Este proceso puede llevar un tiempo por favor espere.
                            <br />
                            {chat.statusText}
                        </p>
                    </ul>

                </div>



            </>


        )

    } else {
        // Si el sistema esta inicializado renderizara el chat
        return (

            <>
                <ul className='h-full flex flex-col  overflow-y-auto  pb-4'>
                    {
                        chat.messages.map((message, index) => {
                            return <Messaje key={index} content={messageFormater(message.text)} user={message.user} />
                        })
                    }
                    {
                        chat.generateMessage == true ? <Messaje content={messageFormater(chat.reply)} user={"bot"} reply={true} /> : null
                    }

                </ul>
                <div className='fixed bottom-0 w-full z-50 left-0 px-2 py-2 bg-[#131111] flex'>
                    <form onSubmit={(e) => handleUserMessageSubmit(e)} className='flex-row flex gap-3 text-slate-100  w-full  sm:justify-center  animate-fade '>
                        <input value={userMessageInput} disabled={chat.generateMessage} onInput={(e) => handleUserMessage(e)} className='w-96 bg-transparent border border-slate-500 p-2 rounded-lg  disabled:animate-pulse'
                            type='text' placeholder='¿Como estamos?' />
                        <button className='text-rose-500' disabled={chat.generateMessage}>Enviar</button>
                    </form>
                </div>
              
            </>

        )
    }

}
