
import Chat from '@/Components/chat';
import Messaje from '@/Components/Messaje'
import { useChat } from '@/hooks/useChat';
import { Chathura } from 'next/font/google';
import React, { use, useEffect, useState } from 'react'

export default function page() {
 

  





  return (
    <main className='flex  max-h-[99dvh] flex-col mt-16 h-[90dvh] bg-white  overflow-y-hidden '>
    
        <section className='flex h-full  overflow-y-hidden'>
           
            <Chat/>
          
        </section>

       
    </main>  
  )
}
