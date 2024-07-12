"use client"
import { Chathura } from 'next/font/google';
import Script from 'next/script';
import React, { use, useEffect, useRef, useState } from 'react'
import Chat from '../Components/chat';
import LeftBar from '../Components/leftBar';
import { ChatProvider, useChatContext } from '../Components/context/chatContext';

import InputChat from '../Components/inputChat';

const NavChat = () => {
  const {conversationHook} = useChatContext();  
  
  function handleOpenNavigation (){
    conversationHook.changeStateOpenOrClose()
  }
  return (
    <div className='p-2 mt-2 w-full '>
      <button disabled={conversationHook.openOrClose} onClick={() => handleOpenNavigation()} className={'p-1 transition-all rounded-lg ' + (conversationHook.openOrClose ? 'opacity-0' : 'opacity-1 hover:bg-zinc-800')  }> 
          {/* <Open_Navigation width={24} height={24} className='fill-rose-500'/> */}
      </button>
    </div>
  )

}



export default function Page() {

  
  
  return (
   
      <main className=' h-[100dvh] flex flex-row  overflow-y-hidden '>

      
          <article  className='w-full flex flex-row  h-[100%]  overflow-y-hidden desactive-scrollbar'>


            <LeftBar/>
       
            <div className='w-full'>

            <Chat />
            </div>
          </article>
     

      </main>
     

    

  )
}
