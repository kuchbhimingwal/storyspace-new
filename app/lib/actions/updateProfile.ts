"use server"
import client from "@/db"

export async function updateProfile(userId:string, firstname:string | undefined , lastname: string | undefined, bio:string | undefined){
  
  try {
    const res = await client.user.update({
      where:{
        id: userId
      },
      data: {
        fisrname: firstname,
        lastname: lastname,
        bio: bio
      }
    })

    return res.id;
  } catch (error) {
    console.log(error);
    
    return null
  }
}