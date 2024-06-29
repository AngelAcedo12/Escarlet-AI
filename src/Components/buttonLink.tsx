import Link from 'next/link';
import React from 'react'

type ButtonLinkProps = {
    href: string;
    text: string;
    className?: string;
    
}


export default function ButtonLink({ href, text, className }: ButtonLinkProps) {
    className = className || "p-2 px-3 items-center text-center rounded-full  bg-transparent border text-white  border-slate-200 hover:bg-slate-200 hover:text-black transition-all"
    return (
    <Link href={href} ><span className={className + "mt-5"}>{text}</span></Link>
  )
}
