"use client"
import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from './Button';
import {updateProfile} from "../lib/actions/updateProfile"
import { useSession } from "next-auth/react";
import {getUser} from "../lib/actions/getUser"
function ProfileEditPage() {
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState("");
  const [bio , setBio] = useState("");
  const [res, setRes] = useState("");
  const [user, setUser] = useState({
    id: "",
    fisrname: "",
    lastname: "",
    email: "",
    bio: "",
    password: "",
    createdAt: Date});

  const session = useSession();
  //@ts-ignore
  const userId = session.data?.user?.id;

  const clickHandler =async()=>{
    //@ts-ignore
    const userId = session.data?.user?.id;
    console.log((userId));
    
    const res = await updateProfile(userId,firstName,lastName,bio);
    if(res){
      setRes("updateed")
    }else {
      setRes("error while updating")
    }
  }
  useEffect(()=>{
    const datafetch = async()=>{
      const user = await getUser(userId);
      if(user){
        //@ts-ignore
        setUser(user);
      }
    }
    datafetch()
    console.log(user);
    
  },[])
  return (
    <div className='flex justify-center'>
      <div className='w-full m-3  md:w-3/5 md:p-10 p-3 lg:w-2/5 mt-10 border rounded-3xl border-gray'>
      {/* <div className="flex justify-between p-2 py-4 ">
              <div className="flex">
                <div className='flex items-center justify-center text-lg mr-2 bg-black text-white rounded-full w-12 h-12  text-center'>{user?.fisrname.charAt(0)}</div>
                <div>
                  <h3 className="font-medium text-lg"> {user?.fisrname} {user?.lastname}</h3>
                  <p className="font-thin text-xs">14.4K Followers</p>
                </div>
              </div>
        </div>
        <div className="p-2 border-b border-gray font-light text-xs text-gray">{user?.bio ? user?.bio: "Bio not added"}</div> */}
        <div className='my-4'>
          <h2 className='text-3xl font-semibold text-gray font-sans'>UPDATE YOU PROFILE</h2>
        </div>
        <div className='my-4'>
          <p className='text-md font-thin text-gray font-sans'>Update you info here</p>
        </div>
        <div className=''>
          <Input label='First Name' placeholder='Enter your first name' type='text' onchane={(e)=>{setFirstName(e)}}/>
        </div>
        <div className=''>
          <Input label='Last Name' placeholder='Enter your last name' type='text' onchane={(e)=>{setLastName(e)}}/>
        </div>
        <div className=''>
          <Input label='Bio' placeholder='Enter your Bio' type='text' onchane={(e)=>{setBio(e)}}/>
        </div>
        <div className='my-4'>
          <Button title='Update' onclick={clickHandler} />
        </div>
        <div className='text-center'>
          <p className='font-sans font-medium text-black'>{res}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileEditPage