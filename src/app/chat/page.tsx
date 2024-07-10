"use client"

import { Chathura } from 'next/font/google';
import Script from 'next/script';
import React, { use, useEffect, useRef, useState } from 'react'
import Chat from '../Components/chat';
import LeftBar from '../Components/leftBar';
import { ChatProvider } from '../Components/context/chatContext';

export default function Page() {

  
  
  return (
    <ChatProvider >
      <main className=' h-[100dvh] flex flex-row  overflow-y-hidden '>

      
          <article  className='w-full flex flex-row  h-[100%]  overflow-y-hidden desactive-scrollbar'>


            <LeftBar/>
       
            <div className='w-full'>

            <Chat />
            </div>
          </article>
     

      </main>
     

    </ChatProvider>

  )
}
