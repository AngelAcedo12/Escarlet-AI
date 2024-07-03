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
      <main className='flex  max-h-[99dvh] flex-col mx-2 md:mx-0 h-[84dvh] mt-16  md:px-2 mb-5 overflow-y-hidden '>

        <section className='flex h-full  overflow-y-hidden'>
          <article className='w-full flex justify-between flex-col px-2 mb:px-2 mb-2  max-h-max  overflow-y-hidden '>
            <Chat />
          </article>
        </section>


      </main>
     

    </>

  )
}
