"use client"
import React from 'react'

interface prop {
  title: string;
  onclick: ()=>void
}
function Button({title,onclick}: prop) {
  return (
    <div>
      <button onClick={onclick} className='bg-black text-white p-2 px-3 w-full rounded-lg font-sans'>{title}</button>
    </div>
  )
}

export default Button