"use server"
import client from "@/db"

export async function postblog(title:string,subTitle:string, content: string, authorId:string){
  
  try {
    const res = await client.article.create({
      data:{
        title,
        subTitle,
        content,
        authorId,
      }
    });

    return res.id;
  } catch (error) {
    console.log(error);
    
    return null
  }
}