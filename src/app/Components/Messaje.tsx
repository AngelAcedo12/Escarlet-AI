import { messageFormater } from '@/utils/messageFormater';
import React, { ReactElement, useEffect } from 'react'


type MessajeProps = {
  content: ReactElement;
  user: string;
  reply?: boolean;
  
}

export default function Messaje({ content, user, reply }: MessajeProps) {

  const classBot = "md:px-2 rounded-md text-black mt-2 flex flex-col w-auto items-start "
  const classUser = "md:px-2 rounded-md  text-black  mt-2 flex flex-col w-auto  items-end "
  const messageUserClass = " bg-green-400 w-fit text-end "
  const messageBotClass = " bg-neutral-100 w-fit"
  const messageClass = user == "bot" ? messageBotClass : messageUserClass
  

  if (reply != undefined) {

    return (
      <li className={user == "bot" ? classBot : classUser}>
        <div className={'mt-2  p-2  md:px-4 rounded-lg animate-pulse' + messageClass}>
          <strong>{user == "bot" ? "Escarlet" : "User"}</strong>
          <br />
          <div className='max-w-full' dir='auto'>
            {content}
          </div>
        </div>
      </li>
    )

  } else {
    return (
      <li className={user == "bot" ? classBot : classUser}>

        <div className={'mt-2 p-2 md:px-4 rounded-lg animate-fade' + messageClass}>
          <strong>{user == "bot" ? "Escarlet" : "User"}</strong>
          <br />
          <div className='max-w-full' dir='auto'>
            {content}
          </div>
        </div>
      </li>
    )
  }


}
