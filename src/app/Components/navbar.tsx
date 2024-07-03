"use client"
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  const classLink = "hover:border-b-black border-b-2 border-b-transparent   transition-all"
  return (
    <div className=' bg-inherit text-rose-500  fixed w-full top-0 z-50'>
      <nav className='flex justify-between items-center p-4   ' >
        <h1 className='text-2xl'>Project Escarlet</h1>
        <ul className='flex space-x-4'>
          <Link href='/'><li className={classLink}>Home</li></Link>
          <Link href='/about'><li className={classLink}>About</li></Link>
        </ul>
      </nav>
    </div>
  )
}
 