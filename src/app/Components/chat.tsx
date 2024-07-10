"use client"
import React, { use, useEffect, useState } from 'react'
import Messaje from './Messaje';
import Script from 'next/script';
import { useChat } from './hooks/useChat';
import { messageFormater } from '@/utils/messageFormater';
import { off } from 'process';
import { useChatContext } from './context/chatContext';

export default function Chat() {

    const {chat,isCompatible} = useChatContext();
    const [userMessageInput, setMessageInput] = useState<string>('');
    




    const handleUserMessage = (e: React.FormEvent<HTMLInputElement>) => {
        setMessageInput(e.currentTarget.value);
    }
    const handleUserMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (chat.generateMessage == false) {
            
            if(chat.conversation == undefined){ 
                chat.initConversation(userMessageInput)
            }
           chat.addMessage({ text: userMessageInput, user: "user", name: "User" })
            setTimeout(() => {
                chat.userRequest(userMessageInput)
            }, 1000);
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
            <div className='p-2'>
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



            </div>


        )

    } else {
        // Si el sistema esta inicializado renderizara el chat
        return (

            <div className='flex flex-col relative h-full'>
                <ul className='h-full flex flex-col max-h-max overflow-y-auto  pb-20 md:px-0 px-2'>
                    {
                        chat.conversation == undefined   ?
                            <Messaje content={messageFormater('Hola, soy Escarlet tu asistente virtual ¿En que puedo ayudarte?')} user={"bot"} />
                        : 
                        chat.message.map((message, index) => {
                            return <Messaje key={index} content={messageFormater(message.text)} user={message.user} />
                        })
                      
                    }   
                    {
                          chat.generateMessage == true ? <Messaje content={messageFormater(chat.reply)} user={"bot"} reply={true} /> : null
                    }

                </ul>
                <div className='  w-full  px-2 py-2 bg-[#131111] flex absolute bottom-0 z-50'>
                    <form onSubmit={(e) => handleUserMessageSubmit(e)} className='flex-row flex gap-3 text-slate-100  w-full  sm:justify-center  animate-fade '>
                        <input value={userMessageInput} disabled={chat.generateMessage} onInput={(e) => handleUserMessage(e)} className='w-96 bg-transparent border border-slate-500 p-2 rounded-lg  disabled:animate-pulse'
                            type='text' placeholder='¿Como estamos?' />
                        <button className='text-rose-500' disabled={chat.generateMessage}>Enviar</button>
                    </form>
                </div>
              
            </div>

        )
    }

}
