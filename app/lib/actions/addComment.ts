"use server"
import client from "@/db"

export async function postComment(postId:string, authorId:string, comment:string){
  
  try {
    const res = await client.comment.create({
      data:{
        text: comment,
        articleId: postId,
        authorId: authorId
      }
    })
    return res.id;
  } catch (error) {
    console.log(error);
    
    return null
  }
}