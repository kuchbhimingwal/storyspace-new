"use client"
import React from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
function Header() {
  const session = useSession();
  const email = session.data?.user?.email;
  const router = useRouter();
  return (
    <div className='flex justify-between'> 
      <div onClick={()=>{router.push(`/`)}}>
       <Image src={`/SsLogo.png`} alt='logo' width="35" height="50" className='p-1 cursor-pointer'/>
      </div>
      <div className='flex'>
        <a onClick={()=>{router.push(`/write`)}} className='font-sans text-lighgray hover:text-gray font-light p-3 cursor-pointer'>Write</a>
        <a onClick={()=>{router.push(`/read`)}} className='font-sans text-lighgray hover:text-gray font-light p-3 cursor-pointer'>Read</a>
        <a href="#" className='font-sans text-lighgray hover:text-gray font-light p-3'>About us</a>
        {email ? <button onClick={()=>{router.push('/profile')}} className='font-sans font-light text-lighgray hover:text-gray p-3 cursor-pointer'>Profile</button> : <button onClick={()=>{router.push('/api/auth/signin')}} className='font-sans text-lighgray font-light hover:text-gray p-3 cursor-pointer'>Login</button>}
      </div>
    </div>
  )
}

export default Header