import { getServerSession } from "next-auth"
import client from "@/db"
import { authProvider } from "../../lib/auth";
import PostCard from "@/app/components/PostCard";
import Link from 'next/link'
async function getSession() {
  const session = await getServerSession(authProvider);
  return session;
}
async function getPostByUser(id:string){
  const posts = await client.article.findMany({
    where:{
      authorId: id
    },
    include:{
      images: true,
      coverimages: true
    }
  })
  return posts
}

async function getUser(id:string){
  const user = await client.user.findUnique({
    where:{
      id
    }
  })
  return user
}

async function page() {
  const session = await getSession();
  const user = await getUser(session.user.id);
  const postsByUser = await getPostByUser(session.user.id);
  
  return (
    <div className='flex justify-center'>
      <div className='w-2/4 p-10 border rounded-3xl border-gray'>
      <div className="flex justify-between p-2 py-4 ">
              <div className="flex">
                <div className='flex items-center justify-center text-lg mr-2 bg-black text-white rounded-full w-12 h-12  text-center'>{user?.fisrname.charAt(0)}</div>
                <div>
                  <h3 className="font-medium text-lg"> {user?.fisrname} {user?.lastname}</h3>
                  <p className="font-thin text-xs">14.4K Followers</p>
                </div>
              </div>
              <div>
                  <div className='flex my-3'>
                    <Link href="/profile/edit">
                      <h1 className="text-mainpurple font-bold" >Edit Profile:</h1>
                    </Link>
                  </div>
              </div>
        </div>
        <div className="p-2 border-b border-gray font-light text-xs text-gray">{user?.bio ? user?.bio: "Bio not added"}</div>
        <div>
          <h1 className="font-medium text-gray py-5">More from Arslan Ahmad </h1>
          <div className="grid grid-cols-2">
            {postsByUser.map((post)=>(
              <PostCard post={post}/>
            ))}
          </div>
          </div>
      </div>
    </div>
  )
}

export default page