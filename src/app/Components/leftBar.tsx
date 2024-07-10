"use client"
import React, { use, useEffect, useState } from 'react'
import { useChat } from './hooks/useChat';
import { chatConversation } from '@/interfaces/conver';
import useConversation from './hooks/useConversation';
import Sum from './Icons/sum';
import { useChatContext } from './context/appContex';
import formaterDate from '@/utils/dateFormater';

const ListConversation = () => {
    const  {conversationHook} = useChatContext();
    const actualDate = formaterDate(new Date())
    const {mapConversation} = conversationHook;


    useEffect(() => {
        console.log(mapConversation)
    },[mapConversation])
    return (
        <div className='flex flex-col gap-2'>
            {
                mapConversation.map((day, index) => {
                    return <ul key={index}>
                        <h1 className='text-neutral-400 text-base'>
                            {
                                day.date === actualDate ? "Hoy" : day.date
                            }
                        </h1>
                        <ul className='flex flex-col gap-2'>
                            {
                                day.conversations.map((conversation: chatConversation, index) => {
                                    return <Conversation key={index} date={conversation.date} title={conversation.title} id={conversation.id}></Conversation>
                                })
                            }
                        </ul>

                    </ul>
                })
            }
           
        </div> 
    )    
}
 
const Conversation = (props: {date:string, title: string, id: string} ) =>{


    const {chat,conversationHook} = useChatContext();
    
    const loadConversation = () => {
    //
    }

    return (
        <li onClick={loadConversation} className='p-2  rounded-lg  hover:bg-zinc-800 transition-all cursor-pointer animate-fade'>
            <div className='flex flex-row items-baseline'>
                <h1 className='text-rose-500 truncate text-sm'>
                {props.title}
                </h1>
            </div>
          <div className='flex flex-col '>
            <h2 className='text-xs text-neutral-500'>{props.date}</h2>
            <h3 className='text-xs truncate text-neutral-500'>{props.id}</h3>
          </div>
        </li>
    )
}


export default function LeftBar() {
    const {chat,conversationHook} = useChatContext();
    
    const newConversation = () => {
        console.log("New conversation")
        chat.newConversation()
    }

    useEffect(() => {
        if(window){
            
                conversationHook.loadConverSetions()
           
        }
    },[])


    return (
        <ul className='md:flex md:flex-col lg:w-96 md:w-96 md:z-0 h-full w-full hidden gap-2 bg-neutral-900 p-2'>  
            <div className='flex flex-row justify-between'> 
               
                <h1 className='text-rose-500 text-xl p-1 '>Escarlet AI</h1>
                <button onClick={newConversation} className='rounded-md  p-1 hover:bg-zinc-800 transition-all'>
                    <Sum width={24} height={24} className='fill-rose-500'></Sum>
                </button>
            </div>
            <hr></hr>
            <ListConversation></ListConversation>
        </ul>
    )
}
