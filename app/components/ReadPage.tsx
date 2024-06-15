"use server"
import client from "@/db"
import PostCard from './PostCard'
const getPosts = async()=>{
  try {
  const res = await client.article.findMany({
    include:{
      images: true,
      coverimages: true
    }
  });
  
  return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}
async function ReadPage() {
  const posts = await getPosts();
  
  return (
    <div className='grid-cols-3 grid p-10'>
      {posts?.map((post)=>(
        <PostCard post={post}/>
      ))}
    </div>
  )
}

export default ReadPage