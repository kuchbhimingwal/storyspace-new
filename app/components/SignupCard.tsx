"use client"
import React, { useState } from 'react'
import Input from '../components/Input'
import Button from './Button';
import { signupAction } from "../lib/actions/signup"
import { useRouter } from 'next/navigation';

function SignupCard() {
  const router = useRouter();
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [res, setRes] = useState("");

  const clickHandler =async()=>{
    const res = await signupAction(firstName, lastName, email, password);
    setRes(res)
  }
  return (
    <div className='flex justify-center'>
      <div className='w-full m-3  md:w-3/5 md:p-10 p-3 lg:w-2/5 border rounded-3xl border-gray'>
        <div className='my-4'>
          <h2 className='text-3xl font-semibold text-gray font-sans'>NEW ACCOUNT</h2>
        </div>
        <div className='my-4'>
          <p className='text-md font-thin text-gray font-sans'>Create a new account for free</p>
        </div>
        <div className=''>
          <Input label='First Name' placeholder='Enter your first name' type='text' onchane={(e)=>{setFirstName(e)}}/>
        </div>
        <div className=''>
          <Input label='Last Name' placeholder='Enter your last name' type='text' onchane={(e)=>{setLastName(e)}}/>
        </div>
        <div className=''>
          <Input label='Email' placeholder='Enter your Email' type='text' onchane={(e)=>{setEmail(e)}}/>
        </div>
        <div className=''>
          <Input label='Password' placeholder='Enter your password' type='password' onchane={(e)=>{setPassword(e)}}/>
        </div>
        <div className='my-4'>
          <Button title='Sign Up' onclick={clickHandler} />
        </div>
        <div className='text-center'>
          <p className='font-sans font-medium text-black'>{res}</p>
        </div>
        <div className='text-center'>
          <p className='font-sans font-thin '>Already have a account? <span className='font-medium cursor-pointer' onClick={()=>{router.push("/signin")}}>Login</span></p>
        </div>
      </div>
    </div>
  )
}

export default SignupCard