"use client"
import React, { use, useEffect, useState } from 'react'
import Messaje from './Messaje';
import Script from 'next/script';
import { useChat } from './hooks/useChat';
import { messageFormater } from '@/utils/messageFormater';
import { off } from 'process';
import { useChatContext } from './context/chatContext';
import Open_Navigation from './Icons/open_navigation';

export default function Chat() {

    const { chat, isCompatible } = useChatContext();

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

            <div className='flex flex-col mx-2 md:px-4  max-h-max my-2 h-full overflow-y-auto'>
                <ul className='flex flex-col md:px-0 px-2'>
                    {
                        chat.conversation == undefined ?
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
                

            </div>

        )
    }

}
