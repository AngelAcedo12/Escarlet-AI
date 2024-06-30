
"use client"
import { useChat } from '@/hooks/useChat';
import React, { use, useEffect, useState } from 'react'
import Messaje from './Messaje';

export default function Chat() {

    const chat = useChat();
    const [userMessageInput, setMessageInput] = useState<string>('');
    const [isCompatible, setIsCompatible] = useState<boolean>(true);   

    const detectedCompatibility =  () => {
        const response = chat.isCompatible();
        console.log(response)
        return response;

    };



    useEffect(() => {
        if(detectedCompatibility()){
            setIsCompatible(true);
            chat.initChat();
        }else{
            setIsCompatible(false);

        }
    }, [])


    const handleUserMessage = (e: React.FormEvent<HTMLInputElement>) => {

        setMessageInput(e.currentTarget.value);
        console.log(userMessageInput)
    }
    const handleUserMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Submit", userMessageInput)
        e.preventDefault();
        chat.userRequest(userMessageInput);
    }

    if(!isCompatible){
        return (

            <article  className='w-full flex justify-between flex-col  p-2 '>
            
            <div className='h-full w-full '>
                <ul className=' flex flex-col'>
                    <p className='text-neutral-400 text-sm '>
                    Su navegador no es compatible con el modelo de lenguaje. 
                    </p>
                </ul>
            </div>
            </article>

        )
    }


    if (chat.progressInit < 1) {
        return (
            <article  className='w-full flex justify-between flex-col  p-2 '>
            <div style={
                {
                    width: `${chat.progress}`
                }
            } className={` bg-blue-400 h-1 animate-pulse rounded-xl`}></div>
            <div className='h-full w-full '>
                <ul className=' flex flex-col'>
                    <p className='text-neutral-400 text-sm '>
                    Este proceso puede llevar un tiempo por favor espere. 
                    <br/>
                     {chat.statusText}
                    </p>
                </ul>
                
            </div>
            <form className='flex-row flex gap-3 text-black px-2' >
                <input disabled className='w-full bg-transparent border border-slate-500 p-2 rounded-lg ' type='text' placeholder='¿Como estamos?'/>
                <button disabled>Enviar</button>
            </form>
        </article>
        )
      
    }else{
    
        return (

        <article  className='w-full flex justify-between flex-col  max-h-max   lg:mx-32 overflow-y-hidden '>

            
                <ul className='h-full flex flex-col  overflow-y-auto '>
                  {
                    chat.messages.map((message, index) => {
                        console.log(message.user)
                        return <Messaje key={index} text={message.text} user={message.user} />
                    })
                  }
                  {
                    chat.generateMessage==true ? <Messaje text={chat.reply} user={"bot"}  /> : null
                  }
                    

                </ul>
                
    
            <form onSubmit={(e) => handleUserMessageSubmit(e)} className='flex-row flex gap-3 text-black px-4 '>
                <input onInput={(e) =>handleUserMessage(e)} className='w-full bg-transparent border border-slate-500 p-2 rounded-lg ' type='text' placeholder='¿Como estamos?'/>
                <button>Enviar</button>
            </form>
        </article>
            
    
    
        )
    }

}
