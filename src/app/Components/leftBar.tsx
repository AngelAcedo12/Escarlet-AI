"use client"
import React, { use, useEffect, useState } from 'react'
import { useChat } from './hooks/useChat';
import { chatConversation } from '@/interfaces/conver';
import useConversation from './hooks/useConversation';
import Sum from './Icons/sum';
import { useChatContext } from './context/chatContext';
import formaterDate from '@/utils/dateFormater';
import SideNavigation from './Icons/side_navigations';
import Link from 'next/link';
import NotificateIcon from './notificateIcon';

const ListConversation = () => {
    const { conversationHook } = useChatContext();
    const actualDate = formaterDate(new Date())
    const { mapConversation } = conversationHook;



    return (
        <div className='flex flex-col gap-2 overflow-y-auto'>
            {
                mapConversation.length === 0 ? <h1 className='text-neutral-400 text-base my-2'>No hay conversaciones</h1> :
                    mapConversation.map((day, index) => {
                        return <ul key={index} >
                            <h1 className='text-neutral-400 text-base my-2'>
                                {
                                    day.date === actualDate ? "Hoy" : day.date
                                }
                            </h1>
                            <ul className='flex flex-col gap-2 mr-2'>
                                {
                                    day.conversations.map((conversation: chatConversation, index) => {
                                        return <Conversation key={index} date={conversation.date} title={conversation.title} id={conversation.id} new={conversation.new || false}></Conversation>
                                    })
                                }
                            </ul>

                        </ul>
                    })
            }

        </div>
    )
}

const Conversation = (props: { date: string, title: string, id: string, new: boolean }) => {


    const { chat, conversationHook, voice } = useChatContext();

    const loadConversation = () => {

        let list = JSON.parse(window.localStorage.getItem("conversations") || "[]")
        let conversation = list.find((item: chatConversation) => item.id === props.id)
        voice.cancelMessage()
        if (conversation != undefined) {
            chat.changeConversations(conversation)
        } else {
            window.alert("No se encontro la conversacion")
        }
    }
    const desactiveNotificate = () => {
        let list = JSON.parse(window.localStorage.getItem("conversations") || "[]")
        let conversation = list.find((item: chatConversation) => item.id === props.id)
        if (conversation != undefined) {
            conversation.new = false
            window.localStorage.setItem("conversations", JSON.stringify(list))
            conversationHook.loadConverSetions()
        } else {
            window.alert("No se encontro la conversacion")
        }

    }

    return (

        <li onMouseEnter={desactiveNotificate} onClick={loadConversation} className='p-2  rounded-lg  transition-all cursor-pointer animate-fade hover:bg-zinc-800' >
            <div className='flex flex-row items-center justify-between'>

                <h1 className='text-rose-500 truncate text-sm'>
                    {props.title}
                </h1>
                {
                    props.new ? <NotificateIcon ></NotificateIcon> : <></>
                }
            </div>
            <div className='flex flex-col '>
                <h2 className='text-xs text-neutral-500'>{props.date}</h2>
                <h3 className='text-xs truncate text-neutral-500'>{props.id}</h3>
            </div>

        </li>
    )
}


export default function LeftBar() {

    const { chat, conversationHook } = useChatContext();

    const newConversation = () => {
        chat.newConversation()
    }
    const closeNav = () => {
        conversationHook.changeStateOpenOrClose()

    }



    return (

        <>
            <ul className={'flex flex-col z-50 h-full  gap-2 bg-neutral-900 p-2 transition-all ' +
                (conversationHook.openOrClose ? 'md:w-96 w-full md:relative fixed  ' : 'w-[0%] -translate-x-full hidden')
            }
            >
                <div className='flex flex-row justify-between items-center  '>
                    <Link href='/'>
                        <h1 className='text-rose-500 text-xl p-1 '>Escarlet AI</h1>
                    </Link>
                    <div className='flex flex-row gap-2'>
                        <button onClick={newConversation} className='rounded-md  p-1 hover:bg-zinc-800 transition-all'>
                            <Sum width={24} height={24} className='fill-rose-500'></Sum>
                        </button>
                        <button onClick={closeNav} className='rounded-md  p-1 hover:bg-zinc-800 transition-all'>
                            <SideNavigation width={24} height={24} className='fill-rose-500'></SideNavigation>
                        </button>
                    </div>
                </div>

                <ListConversation></ListConversation>
            </ul>

        </>



    )
}
