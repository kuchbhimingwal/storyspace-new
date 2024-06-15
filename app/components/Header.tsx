"use client"
import React from 'react'
import logo from '../../public/SsLogo.png'
import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
function Header() {
  const session = useSession();
  const email = session.data?.user?.email;
  const router = useRouter();
  return (
    <div className='flex justify-between'>
      <div>
       <Image src={`/SsLogo.png`} alt='logo' width="35" height="50" className='p-1'/>
      </div>
      <div className='flex'>
        <a href="#" className='font-sans font-light p-3'>Write</a>
        <a href="#" className='font-sans font-light p-3'>Read</a>
        <a href="#" className='font-sans font-light p-3'>About us</a>
        {email}
        {email ? <button onClick={async()=>{await signOut()}}>logout</button> : <button onClick={()=>{router.push('/api/auth/signin')}}>login</button>}
      </div>
    </div>
  )
}

export default Header