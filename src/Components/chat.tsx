
"use client"
import { useChat } from '@/hooks/useChat';
import React, { useEffect } from 'react'
import Messaje from './Messaje';

export default function Chat() {

    const chat = useChat();


    useEffect(() => {
        chat.initChat();
    }, [])

    if (chat.progressInit < 99) {
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
                    Este proceso puede llevar un tiempo por favor espere. Progreso: {chat.progress}
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

   

        <article  className='w-full flex justify-between flex-col  p-2 bg-purple-50'>

            <div className='h-full w-full '>
                <ul className=' flex flex-col'>
                    <Messaje text='Hola' user='bot' date='12/12/12'/>  
                    <Messaje text='Este es un mensaje muyy asdasdasdasd asd asdas dasd as dasd asd asdasd a asdads as da sdasdasdas   ad asd ad' user='user' date='12/12/12'/> 
                </ul>
                
            </div>
            <form className='flex-row flex gap-3 text-black px-4'>
                <input className='w-full bg-transparent border border-slate-500 p-2 rounded-lg ' type='text' placeholder='¿Como estamos?'/>
                <button>Enviar</button>
            </form>
        </article>
            
    
    
        )
    }

}
