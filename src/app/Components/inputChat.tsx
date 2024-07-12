import React, { useState } from 'react'
import { useChatContext } from './context/chatContext';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
import ProgresComponent from './ProgresComponent';



type InputChatProps = {
    redirect: boolean
    route?: string
}


export default function InputChat(config:InputChatProps) {

    const [userMessageInput, setMessageInput] = useState<string>('');
    const { chat, isCompatible } = useChatContext();
    const route = useRouter();


    const handleUserMessage = (e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement >) => {
        setMessageInput(e.currentTarget.value);
    }
    const handleUserMessageSubmit = async (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement > | React.MouseEvent<HTMLButtonElement, MouseEvent>  ) => {
        e.preventDefault();

        if (chat.generateMessage == false) {

            if (chat.conversation == undefined) {
                chat.initConversation(userMessageInput)
            }
            chat.addMessage({ text: userMessageInput, user: "user", name: "User" })
            setTimeout(() => {
                chat.userRequest(userMessageInput)
            }, 1000);
            setMessageInput('');
        }
    }

    if(chat.initialization == false){
       return( 
       <div className=' p-2 relative bottom-0  flex bg-[#131111] items-center h-min md:justify-center  ' >
            <ProgresComponent></ProgresComponent>
        </div>)
    }else{
        return (
            <div className=' p-2 relative bottom-0  flex bg-[#131111] items-center h-min md:justify-center  ' >
                <form onSubmit={(e) => handleUserMessageSubmit(e)} className='flex-row max-sm:w-full  flex gap-3 text-slate-100   sm:justify-start  justify-between bg-zinc-800 p-2 rounded-md animate-fade '>
                    <div className='items-start flex w-full '>
                        {
                            config.redirect == true ? <input type='text' disabled={chat.generateMessage} onInput={(e) => { handleUserMessage(e)}}  placeholder='Introduce un mensaje'  className='md:w-96 w-full p-2 resize-none bg-transparent h-fit rounded-lg focus:outline-none disabled:animate-pulse text-wrap '  
                            onKeyDown={ async(e) => {
                                if (e.key == 'Enter' ) {
                                   
                                   
                                    handleUserMessageSubmit(e)
                                    route.push(config.route || "./")
    
                                }
                            }
                                
                            }/>
                            :   
                            <textarea value={userMessageInput} dir='auto' disabled={chat.generateMessage}  onKeyDown={(e) => {
                                if (e.key == 'Enter' ) {
                                    handleUserMessageSubmit(e)
                                 }
                            
        
                                }
        
                            } tabIndex={0} rows={1} onInput={(e) => { handleUserMessage(e) }}
                                className='md:w-96 w-full p-2 resize-none bg-transparent h-fit rounded-lg focus:outline-none disabled:animate-pulse text-wrap '
                                placeholder='¿Como estamos?'>
        
                            </textarea>
                        }
                      
                    </div>
                    <button onClick={e =>  handleUserMessageSubmit(e)} className='text-rose-500' disabled={chat.generateMessage}>Enviar</button>
                </form>
            </div>
        )
    }
    
    
}

