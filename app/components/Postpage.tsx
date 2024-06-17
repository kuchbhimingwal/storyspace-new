import client from "@/db"
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
  const postDetils = await getPost(postId);
  if(postDetils){
    console.log(postDetils);
  } else {
    console.log("error while getting this post");
  }
  
  return (
    <div>
      <div className="relative w-full h-80">
        <img src={postDetils?.coverimages[0].imageLink} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center md:justify-normal md:pl-20">
          <h1 className="text-white text-4xl font-light">{postDetils?.title}</h1>
        </div>
      </div>
    </div>
  )
}

export default Postpage