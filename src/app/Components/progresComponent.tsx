import React from 'react'
import { useChatContext } from './context/chatContext';
import { CircularProgress } from '@nextui-org/react';

export default function ProgresComponent() {

    const { chat } = useChatContext();






    return (
        <div className='p-2'>

            {
                chat.modelInCache ? 
                <div className='h-full w-full text-white '>
                <ul className=' flex flex-col'>
                    <li>
                        <h1 className='animate-pulse '>Cargando modelo...</h1>
                    </li>
                    
                    {
                    /* <p className=' text-sm '>
                        Este proceso puede llevar un tiempo por favor espere.
                        
                    </p> */
                    }
                </ul>
                </div> 
                :  
                <div className=' '>
                
                <CircularProgress
                size='md'
                showValueLabel={false}
                color='danger'
                className='fill-red-500'
                value={chat.progress}
                label={"Descargando modelo..."}
                >
                </CircularProgress>
                </div> 
                
            }      
        </div>
    )
}
