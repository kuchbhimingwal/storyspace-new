"use client"

import { useState } from "react"
import Input from "./Input"
import Button from "./Button"
import { postComment } from '../lib/actions/addComment'
function AddComment({postId, authurId}: {postId:string, authurId:string}) {
  const [comment, setComment] = useState('');
  const clickHandler = async ()=>{
    const res = await postComment(postId, authurId, comment);
    if(res){
      alert("comment added")
      window.location.reload();
    }else {
      alert("error while writing the comment")
    }
  }
  return (
    <div>
      <Input label='Comment' placeholder='Enter your Comment' type='text' onchane={(e)=>{setComment(e)}}/>

      <Button title='post' onclick={clickHandler} />
    </div>
  )
}

export default AddComment