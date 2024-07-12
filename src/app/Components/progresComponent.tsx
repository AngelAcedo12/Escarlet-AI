import React from 'react'
import { useChatContext } from './context/chatContext';
import { CircularProgress } from '@nextui-org/react';
import Loader from './loader';

export default function ProgresComponent() {

    const { chat } = useChatContext();



    return (
        <div className='p-2'>

            {
                chat.modelInCache ? 
                <div className='h-full w-full text-white '>
                <div className=' flex flex-col'>
                    <Loader ></Loader>
                    {
                    /* <p className=' text-sm '>
                        Este proceso puede llevar un tiempo por favor espere.
                        
                    </p> */
                    }
                </div>
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
