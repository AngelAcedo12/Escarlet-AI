"use client"
import React, { use, useEffect, useState } from 'react'
import Messaje from './Messaje';
import Script from 'next/script';
import { useChat } from './hooks/useChat';

export default function Chat() {

    const chat = useChat();
    const [userMessageInput, setMessageInput] = useState<string>('');
    const [isCompatible, setIsCompatible] = useState<boolean>(true);



    function initWorket(){
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
        setIsCompatible(detectedCompatibility());
        if(isCompatible){
            initWorket()
            chat.initChat()
        }
    }, [])


    const handleUserMessage = (e: React.FormEvent<HTMLInputElement>) => {

        setMessageInput(e.currentTarget.value);
        console.log(userMessageInput)
    }
    const handleUserMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        chat.userRequest(userMessageInput);
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
    if (chat.initialization!=true) {
        return (
            <>
                <div
                    style={
                        {
                            width: `${chat.progress}`
                        }
                    } className={` bg-blue-400 h-1 animate-pulse rounded-xl`}>

                </div>
                <div className='h-full w-full '>
                    <ul className=' flex flex-col'>
                        <p className='text-neutral-400 text-sm '>
                            Este proceso puede llevar un tiempo por favor espere.
                            <br />
                            {chat.statusText}
                        </p>
                    </ul>

                </div>

                <form className='flex-row flex gap-3 text-black ' >
                    <input disabled className='w-full bg-transparent border border-slate-500 p-2 rounded-lg ' type='text' placeholder='¿Como estamos?' />
                    <button disabled>Enviar</button>
                </form>

            </>


        )

    } else {
        // Si el sistema esta inicializado renderizara el chat
        return (

            <>
                <ul className='h-full flex flex-col  overflow-y-auto '>
                    {
                        chat.messages.map((message, index) => {
                            console.log(message.user)
                            return <Messaje key={index} text={message.text} user={message.user} />
                        })
                    }
                    {
                        chat.generateMessage == true ? <Messaje text={chat.reply} user={"bot"} /> : null
                    }


                </ul>


                <form onSubmit={(e) => handleUserMessageSubmit(e)} className='flex-row flex gap-3 text-black  '>
                    <input onInput={(e) => handleUserMessage(e)} className='w-full bg-transparent border border-slate-500 p-2 rounded-lg ' type='text' placeholder='¿Como estamos?' />
                    <button>Enviar</button>
                </form>
            </>

        )
    }

}
