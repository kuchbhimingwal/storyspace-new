"use server"
import { generateUploadURL } from '../s3/s3'

export async function UploadFile(formData:any){
  const url = await generateUploadURL();
  const file = formData.get('file') as File;
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart"
      },
      body: file
    })
  
    const imageUrl = url.split('?')[0]
    // console.log(imageUrl)  
    return imageUrl  
    
  } catch (error) {
    console.log(error);
    
  }
}