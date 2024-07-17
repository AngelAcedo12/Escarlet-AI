import React from 'react'

export default function Loader(props: { type : 'small' | 'big' | undefined}) {
  
 
  if (props.type =='small') {
    return (
      <div className='animate-jump-in'>
        <div  className={`w-5 h-5 rounded-full bg-red-500 loader`}>
        </div>
      </div>
    )
  } else if (props.type == 'big') {
    return (
      <div className='animate-jump-in'>
        <div className=' w-10 h-10 rounded-full bg-red-500 loader '>
        </div>
      </div>
    )
  }else {
    return (
      <div className='animate-jump-in'>
        <div className=' w-10 h-10 rounded-full bg-red-500 loader '>
        </div>
      </div>
    )
  }

 
}
