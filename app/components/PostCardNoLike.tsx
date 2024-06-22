"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { likeFunc } from '../lib/actions/likeFunc';


function PostCard({post , liked, id}: any) {
  const router = useRouter();
  const [likeState , setLikState] = useState(liked);

  // useEffect(()=>{
  //   if(!liked){
  //     setLikedColor("#707070")
  //   } else {
  //     setLikedColor("#7900AF")
  //   }
  // },[]);

  async function clickhandle(){
    if(liked){
      const res = await likeFunc(id , post.id, false);
      if(res){
        setLikState(false)
      }

    } else {
      const res = await likeFunc(id , post.id, true);
      if(res){
        setLikState(true)
      }
    }
    };
  return (
    <div className='col-span-1 border border-gray p-6 m-5'>
      <div className='text-xs text-gray font-light mb-2'>{post.publishedAt.toDateString()}</div>
      <div className='w-full h-40'>
        <img src={post.images[0].imageLink} alt="" className='w-full h-full object-cover'/>
      </div>
      <div className='my-3'>
        <h2 className='text-gray font-semibold text-sm'>{post.title}</h2>
      </div>
      <div>
        <p className='text-gray font-light text-xs'>{post.content.slice(0, 100)} ........</p>
      </div>
      <div>
        <a href="#" className='text-gray font-light text-xs underline my-3' onClick={()=>{router.push(`/post/${post.id}`)}}>Read More</a>
      </div>
    </div>
  )
}

export default PostCard