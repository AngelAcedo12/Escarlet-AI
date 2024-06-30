"use client"

import { Chathura } from 'next/font/google';
import Script from 'next/script';
import React, { use, useEffect, useRef, useState } from 'react'
import Chat from '../Components/chat';

export default function Page() {


  useEffect(() => {
    
  }, [])



  
  return (
    <>
      <main className='flex  max-h-[99dvh] flex-col mt-16 h-[90dvh] bg-white px-2  overflow-y-hidden '>

        <section className='flex h-full  overflow-y-hidden'>
          <article className='w-full flex justify-between flex-col  max-h-max lg:mx-32 overflow-y-hidden '>
            <Chat />
          </article>
        </section>


      </main>
     

    </>

  )
}
