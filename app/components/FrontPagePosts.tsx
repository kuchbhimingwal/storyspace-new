"use client"
import { useEffect, useState } from "react"
import { getPost } from "../lib/actions/getPoost"
import PostCard from "../components/PostCardNoLike";
function FrontPagePosts() {
  const [posts, setPosts] = useState([{}]);
  useEffect(()=>{
    const dataFetch = async()=>{
      const posts = await getPost();
      if(posts){
        setPosts(posts)
      }
    }
    dataFetch();
  },[])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {!posts ? "" : posts.map((post:any)=>(
      <PostCard post={post}/>
    ))}
    </div>
  )
}

export default FrontPagePosts