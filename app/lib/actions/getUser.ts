"use server"
import client from "@/db"

export async function getUser(userId:any){
  try {
  const res = await client.user.findUnique({
    where:{
      id: userId
    }
  })
  return res
  } catch (error) {
    console.log(error);
    
    return null
  }
  
}
