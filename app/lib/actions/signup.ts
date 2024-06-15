"use server"
import client from "@/db"
import bcrypt from "bcrypt";

export async function  signupAction(firstName:string,lastName:string,email:string,password:string){
  const hasedPassword = await bcrypt.hash(password, 10);
  try {
    
  const res = await client.user.create({
    data:{
      fisrname: firstName,
      lastname: lastName,
      email: email,
      password: hasedPassword
    }
  })
  return "user created"
  
  } catch (error) {
    return "error while creating the user"
  }
  
}
