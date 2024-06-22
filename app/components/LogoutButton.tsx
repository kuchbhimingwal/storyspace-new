"use client"
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
interface prop {
  title: string
}
function Button({title}: prop) {
  const router = useRouter();
  return (
    <div>
      <button className='bg-black text-white p-2 px-3 w-full rounded-lg font-sans my-5' onClick={async()=>{ await signOut(); 
}}>{title}</button>
    </div>
  )
}

export default Button