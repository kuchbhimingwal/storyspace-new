"use server"
import client from "@/db"

export async function likeFunc(id:string, postId:string , like:boolean){
  if(like){
    try {
      const res = await client.like.create({
        data: {
          author: {
            connect: { id: id },
          },
          article: {
            connect: { id: postId },
          },
      }
    }
    );
    return true
    } catch (error) {
      console.log(error);
      
      return null
    }
  } else {
    try {
      const res = await client.like.delete{
        where:{
          authorId_articleId:{
            authorId: id,
            articleId: postId
          }
        }
      };

    return true
    } catch (error) {
      
      console.log(error);
      
      return null
    }
  }
  
}
