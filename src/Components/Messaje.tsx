import React from 'react'


type MessajeProps = {
    text: string;
    user: string;
    date: string;

}

export default function Messaje({ text, user, date }: MessajeProps) {

  const classBot = "p-2 rounded-md text-black p-4 flex flex-col  items-start "  
  const classUser = "p-2 rounded-md  text-black p-4 flex flex-col  w-full  items-end "
  const messageUserClass = " bg-green-400"
  const messageBotClass = " bg-neutral-100 "
  const messageClass = user=="bot" ? messageBotClass : messageUserClass
  return (
    <li className={ user=="bot" ? classBot : classUser }>
        <span className={"rounded-full py-2 p-2 " + messageClass }>
            {user}
        </span>
        <p className={'mt-2  text-balance p-2 rounded-lg' + messageClass }>
            {text}
        </p>
    </li>
  )
}
