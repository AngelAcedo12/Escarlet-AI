import React from 'react'


type MessajeProps = {
    text: string;
    user: string;


}

export default function Messaje({ text, user }: MessajeProps) {

  const classBot = "p-2 rounded-md text-black p-4 flex flex-col  items-start "  
  const classUser = "p-2 rounded-md  text-black p-4 flex flex-col  w-full  items-end "
  const messageUserClass = " bg-green-400 w-fit"
  const messageBotClass = " bg-neutral-100 w-fit"
  const messageClass = user=="bot" ? messageBotClass : messageUserClass
  return (
    <li className={ user=="bot" ? classBot : classUser }>
        <span className={"rounded-full py-2 p-2 " + messageClass }>
            {user}
        </span>
        <p className={'mt-2  p-2 rounded-lg ' + messageClass }>
            {text}
        </p>
    </li>
  )
}
