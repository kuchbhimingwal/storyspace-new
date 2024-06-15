"use server"
import client from "@/db"

export async function addImg(articleId:string, imageUrl:string | undefined, coverImg:string | undefined){
    console.log(articleId);
    console.log(imageUrl);
    console.log(coverImg);
    
    
    try {
      const res = await client.image.create({
        data:{
          imageLink : imageUrl,
          articleId: articleId
        }
      });

      const res2 = await client.coverImages.create({
        data:{
          imageLink : coverImg,
          articleId: articleId
        }
      });

      // console.log(res);
      return true
    } catch (error) {
      console.log(error);
      return false
    }
}
