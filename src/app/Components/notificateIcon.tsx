import React from 'react'

export default function NotificateIcon() {
  return (
    <div className=' rounded-full w-3 h-3 relative mx-2   flex '>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
    </div>
  )
}
