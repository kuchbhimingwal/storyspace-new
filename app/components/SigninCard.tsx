"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Input from '../components/Input'
import Button from './Button';

function SigninCard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const clickHandler = async ()=>{

    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
  });
  if(!res?.error){
    // console.log(res);
    router.push("/read")
  } else {
    setError(res?.error)
    console.log(res)
  }
  }
  return (
    <div className='flex justify-center'>
      <div className='w-4/5  md:w-3/5 lg:w-2/5 p-10 border rounded-3xl border-gray'>
        <div className='my-4'>
          <h2 className='text-3xl font-semibold text-gray font-sans'>WELCOME BACK</h2>
        </div>
        <div className='my-4'>
          <p className='text-md font-thin text-gray font-sans'>Welcome back! Please enter your details</p>
        </div>
        <div className=''>
          <Input label='Email' placeholder='Enter your email' type='text' onchane={(e)=>{setEmail(e)}}/>
        </div>
        <div>
          <Input label='Password' placeholder='Enter your password' type='password' onchane={(e)=>{setPassword(e)}}/>
        </div>
        <div className='my-4'>
          <Button title='Log in' onclick={clickHandler} />
        </div>
        <div className='text-center'>
          <p className='font-sans font-thin text-black'>{error}</p>
        </div>
        <div className='text-center'>
          <p className='font-sans font-thin '>Dont have a account? <span className='font-medium cursor-pointer' onClick={()=>{router.push('/signup')}}>Sign up</span></p>
        </div>
      </div>
      </div>
  )
}

export default SigninCard