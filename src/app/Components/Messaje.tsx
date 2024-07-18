import { messageFormater } from '@/utils/messageFormater';
import React, { ReactElement, useEffect } from 'react'
import VolumeUp from './Icons/volume_up';
import { useChatContext } from './context/chatContext';
import PauseBtn from './Icons/pause';
import Loader from './loader';


type MessajeProps = {
  content: ReactElement;
  user: string;
  reply?: boolean;
  text?: string
  
}

export default function Messaje({ content, user, reply, text }: MessajeProps) {
  const { voice } = useChatContext();
  const classBot = "md:px-2 rounded-md text-black mt-2 flex flex-col w-auto items-start  "
  const classUser = "md:px-2 rounded-md    mt-2 flex flex-col w-auto  items-end "
  const messageUserClass = " bg-zinc-800   w-fit text-end "
  const messageBotClass = "  w-fit"
  const messageClass = user == "bot" ? messageBotClass : messageUserClass
  const [messagePlay, setMessagePlay] = React.useState<boolean>(false);
  const [loadingAudio, setLoadingAudio] = React.useState<boolean>(false);


  const playMessage = async (text: string) => {
    if (messagePlay) {
      return;
    }
    
     await voice.playMessage(text)
     window.speechSynthesis.onvoiceschanged = (e) => {
      setMessagePlay(false);
    }
    setMessagePlay(true);
  }

 
  const cancelMessage = async () => {
    setMessagePlay(false);
    voice.cancelMessage();
  }

  const getIconAudio = () => {
    if (messagePlay == false) {
      return <div className='hover:bg-zinc-600 p-1 rounded-md cursor-pointer  transition-all animate-fade' onClick={() => {
        playMessage(text || '');
      }
      }>
        <VolumeUp width={24} height={24} className='fill-rose-500'></VolumeUp>
      </div>
    } else if (messagePlay == true) {

      return <div className='hover:bg-zinc-600 p-1 rounded-md cursor-pointer  transition-all animate-fade' onClick={() => {
        cancelMessage();
      }
      }>
        <PauseBtn width={24} height={24} className='fill-rose-500'></PauseBtn>
      </div>

    }

  }


  if (reply != undefined) {

    return (
      <li className={user == "bot" ? classBot : classUser}>
        <div className={'mt-2  p-2  md:px-4 rounded-lg animate-pulse' + messageClass}>
          <strong className='text-rose-500'>{user == "bot" ? "Escarlet" : "User"}</strong>
          <br />
          <div className='max-w-full  text-slate-100' dir='auto'>
            {content}
          </div>
        </div>
      </li>
    )

  } else {
    return (
      <li className={user == "bot" ? classBot : classUser}>

        <div className={'mt-2 p-2 md:px-4 rounded-lg animate-fade-up' + messageClass}>
          <strong className='text-rose-500'>{user == "bot" ? "Escarlet" : "User"}</strong>
          <br />
          <div className='max-w-full text-white' dir='auto'>
            {content}
          </div>
          <div className='flex mt-2 w-full items-center'>
            {
              text != undefined && user == 'bot' ? getIconAudio() : 
              null
            }
          </div>
        </div>
      </li>
    )
  }


}
