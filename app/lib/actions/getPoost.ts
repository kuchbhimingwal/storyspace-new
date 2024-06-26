"use server"
import client from "@/db"

export async function getPost(){
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
