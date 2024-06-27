import Image from "next/image";
import client from "@/db"
import Link from 'next/link';
import PostCard from "./components/PostCardNoLike";
const dataFetching = async()=>{
  const users = await client.user.findMany({});
  return users
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

export default async function Home() {
  const users = await dataFetching();
  const posts = await getPosts();
  console.log(users)
  return (
    <div>
      <div className='relative overflow-hidden bg-cover bg-no-repeat bg-background-image h-96 w-full flex justify-center flex-col' >
        <h1 className="font-mono font-light text-gray text-4xl p-4">Welcome to StorySpace: </h1>
        <h2 className="font-mono text-gray p-4">Where Your Imagination <br/>
          Comes to Life
          </h2>
          <Link href="/write" className="w-1/3">
            <button className="bg-darkgray text-white  p-2 px-3 m-4 rounded-lg">
              Start Writing
            </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {!posts ? "" : posts.map((post:any)=>(
              <PostCard post={post}/>
            ))}
          </div>
   </div>
  );
}