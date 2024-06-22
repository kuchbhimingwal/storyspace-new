"use server"
import { getServerSession } from "next-auth";
import { authProvider } from "../lib/auth";
import client from "@/db"
import PostCard from './PostCard'
import { redirect } from 'next/navigation'

async function getSession() {
  const session = await getServerSession(authProvider);
  return session;
}
const getPosts = async()=>{
  try {
  const res = await client.article.findMany({
    include:{
      images: true,
      coverimages: true,
      like: true
    }
  });
  
  return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}
const getLikedPost = async(id:string)=>{
  try {
    const res = await client.like.findMany({
      where:{
        authorId: id
      },
      include:{
        article:true
      }
    })
    return res
  } catch (error) {
    console.log(error);
    return null
  }
}
async function ReadPage() {
  const session = await getSession();
  if(!session){
    redirect('/api/auth/signin');
  }
  const id = session.user.id;
  const posts = await getPosts();
  const likedPost = await getLikedPost(id);
  const likedPostIds = likedPost?.map((like) => like.articleId);
  console.log(likedPostIds);
  
  return (
    <div className='grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid p-10'>
      {posts?.map((post)=>(
        <div>
        {likedPostIds?.includes(post.id) ? <PostCard post={post} liked={true} id={id} /> : <PostCard post={post} liked={false} id={id}/>}
        </div>
      ))}
    </div>
  )
}

export default ReadPage