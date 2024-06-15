"use server"
import client from "@/db"

export async function postblog(title:string, content: string, authorId:string){
  try {
    const res = await client.article.create({
      data:{
        title,
        // subTitle:subtitle,
        content,
        authorId,

      }
    });

    return res.id;
  } catch (error) {
    console.log(error);
    
    return "error while creting the post"
  }
}