"use server"
import client from "@/db"

export async function addImg(articleId:string, imageUrl:string | undefined){
    console.log(articleId);
    console.log(imageUrl);
    
    
    try {
      const res1 = await client.image.findMany({});
      console.log(res1);
      
      const res = await client.image.create({
        data:{
          imageLink : imageUrl,
          articleId: articleId
        }
      });

      console.log(res);
      return true
    } catch (error) {
      console.log(error);
      return false
    }
}
