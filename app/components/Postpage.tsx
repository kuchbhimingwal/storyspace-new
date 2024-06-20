import { getServerSession } from "next-auth"
import client from "@/db"
import { authProvider } from "../lib/auth";
import PostCard from './PostCard';
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
async function getPost(postId: string){
  try {
    const res = await client.article.findUnique({
      where:{
        id: postId
      },
      include:{
        images: true,
        coverimages: true
      }
    })

    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}
async function Postpage({postId} : {postId: string}) {
  const session = await getSession();
  const user = await getUser(session.user.id)
  const postDetils = await getPost(postId);
  const postsByUser = await getPostByUser(session.user.id);
  
  return (
    <div>
      <div className="border-b border-gray">
        <div className="relative w-full h-80">
          <img src={postDetils?.coverimages[0].imageLink} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center md:justify-normal md:pl-20">
            <h1 className="text-white text-4xl font-light w-1/3">{postDetils?.title}</h1>
          </div>
        </div>
        <div className="flex justify-center pt-5">
          <div className="w-2/5">
            <h1 className="font-bold text-xl p-2">{postDetils?.title}</h1>
            <h3 className="font-light text-sm p-2">{postDetils?.subTitle}</h3>
            <div className="flex justify-between p-2 py-4 border-b border-gray">
              <div className="flex">
                <div className='flex items-center justify-center text-lg mr-2 bg-black text-white rounded-full w-12 h-12  text-center'>{user?.fisrname.charAt(0)}</div>
                <div>
                <h3 className="font-medium text-lg"> {user?.fisrname} {user?.lastname}</h3>
                <p className="font-thin text-xs">Published {postDetils?.publishedAt.toDateString()}</p>
                </div>
              </div>
              <div>
                  <div className='flex my-3'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30.938 29.252" className='mr-4'>
                  <path id="Icon_ion-heart-dislike-outline" data-name="Icon ion-heart-dislike-outline" d="M29.379,31.5a1.121,1.121,0,0,1-.8-.332L2.858,5.292a1.125,1.125,0,0,1,1.6-1.586L30.177,29.58a1.125,1.125,0,0,1-.8,1.92ZM25.658,5.625a8.724,8.724,0,0,0-6.815,3.586,8.714,8.714,0,0,0-6.815-3.586,7.549,7.549,0,0,0-2.18.32l1.963,1.93a6.515,6.515,0,0,1,4.5,1.875,8.648,8.648,0,0,1,1.529,2,1.125,1.125,0,0,0,2.011,0,8.648,8.648,0,0,1,1.531-2,6.036,6.036,0,0,1,4.279-1.872,5.676,5.676,0,0,1,5.56,5.7,14.629,14.629,0,0,1-4.035,9.81l1.591,1.6c.211-.242.4-.467.572-.675a16.3,16.3,0,0,0,4.121-10.758A7.932,7.932,0,0,0,25.658,5.625Zm-6.815,24.75C12.683,26.192,6.4,20.925,6.469,13.57a5.884,5.884,0,0,1,.157-1.293L4.852,10.486a8.093,8.093,0,0,0-.633,3.058A16.3,16.3,0,0,0,8.34,24.3c1.32,1.608,3.712,4.18,9.238,7.931a2.239,2.239,0,0,0,2.531,0c1.431-.971,2.651-1.863,3.7-2.68l-1.593-1.6C21.111,28.8,19.975,29.605,18.844,30.375Z" transform="translate(-2.531 -3.373)" fill="#707070"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 29.584">
                  <g id="Icon_akar-comment" data-name="Icon akar-comment" transform="translate(-2 -3.5)">
                    <path id="Path_1" data-name="Path 1" d="M21,28.5c5.656,0,8.486,0,10.242-1.758S33,22.156,33,16.5s0-8.486-1.758-10.242S26.656,4.5,21,4.5H15c-5.656,0-8.485,0-10.242,1.758S3,10.844,3,16.5s0,8.486,1.758,10.242A6.472,6.472,0,0,0,9,28.347" fill="none" stroke="#707070" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <path id="Path_2" data-name="Path 2" d="M21,28.5a13.194,13.194,0,0,0-5.761,1.718c-3,1.556-4.5,2.334-5.233,1.837s-.6-2.032-.318-5.106l.063-.7" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2"/>
                  </g>
                </svg>

                  </div>
              </div>
            </div>

            <div className='w-full p-2 pt-5'>
              <img src={postDetils?.images[0].imageLink} alt="" className='w-full h-full object-cover'/>
            </div>
            <div className="p-2 py-5">
              <p className="font-light">{postDetils?.content}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-2/4">

        <div className="flex justify-between p-2 py-4 border-b border-gray">
              <div className="flex">
                <div className='flex items-center justify-center text-lg mr-2 bg-black text-white rounded-full w-12 h-12  text-center'>{user?.fisrname.charAt(0)}</div>
                <div>
                <h3 className="font-medium text-lg"> {user?.fisrname} {user?.lastname}</h3>
                <p className="font-thin text-xs">14.4K Followers</p>
                </div>
              </div>
              <div>
                  <div className='flex my-3'>
                    <h1 className="text-mainpurple font-bold">Follow:</h1>
                  </div>
              </div>
        </div>
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
    </div>
  )
}

export default Postpage