import Loader from "@/app/Components/loader";
import { CodeBlock, dracula, PrismLangauge, xonokai } from "@react-email/code-block";
import { Html } from "next/document";
import React, { ReactElement, CSSProperties, ReactNode } from "react";
import * as showdown from 'showdown'

interface MessagePart {
  leguaje?: string;
  text: string;
  type: 'code' | 'inline-code' | 'bold' | 'normal' ;
}


const obteinsParts = (text: string) => {
  
  const converter = new showdown.Converter();

  text  = converter.makeHtml(text);
  const content = new HTMLDivElement().innerHTML = text
  console.log(content)
  return content
}




const createHtml = (children: HTMLElement): ReactElement => {


  const style: CSSProperties = {
    padding: '1em',
    margin: '0',
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    textWrap: 'wrap',
  }
  
  return (
    <div >
      
      
    </div>
  )


}


const messageFormater = (text: string) => {


  let parts = obteinsParts(text)
  let html: ReactElement = createHtml(parts)

  return (
    <div className='whitespace-pre-line' dir='auto' >
      
    </div>
  )
}

export { messageFormater }