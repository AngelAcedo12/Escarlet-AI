import React from 'react'


type MessajeProps = {
    text: string;
    user: string;
    reply?: boolean;

}

export default function Messaje({ text, user, reply }: MessajeProps  ) {

  const classBot = "px-2 rounded-md text-black mt-2 flex flex-col  items-start "  
  const classUser = "px-2 rounded-md  text-black  mt-2 flex flex-col  w-full  items-end "
  const messageUserClass = " bg-green-400 w-fit text-end "
  const messageBotClass = " bg-neutral-100 w-fit"
  const messageClass = user=="bot" ? messageBotClass : messageUserClass

  if(reply!=undefined){
  
    return (
      <li className={ user=="bot"  ? classBot : classUser }>
         
          <text  className={'mt-2  p-2 rounded-lg animate-pulse' + messageClass }>
              <strong>{user=="bot" ? "Escarlet" : "User"}</strong>
              <br />
              {text}
          </text>
      </li>
    )
  
  }else{

  }

  return (
    <li className={ user=="bot"  ? classBot : classUser }>
       
        <text  className={'mt-2  p-2 rounded-lg animate-fade' + messageClass }>
            <strong>{user=="bot" ? "Escarlet" : "User"}</strong>
            <br />
            <p>
              {text}
            </p>
        </text>
    </li>
  )
}
