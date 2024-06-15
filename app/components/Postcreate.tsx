"use client"
import ImageInput from './ImageInput'
import { useEffect, useState } from 'react';
import { UploadFile } from '../lib/actions/uploadImg'
import { postblog } from '../lib/actions/postBlog'
import { addImg } from '../lib/actions/addImg'
import Input from './Input';
import Button from './Button';
import { useSession } from "next-auth/react";
import { String } from 'aws-sdk/clients/batch';
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router';

function Postcreate() {
  const { data: session, status } = useSession();
  const authurId = session?.user?.id;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [coverFile, setCoverFIle] = useState<File | null>(null);
  const [title , setTitle] = useState("");
  const [subtitle , setSubtitle] = useState("");
  const [content , setContent] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) redirect("/signin"); // Redirect to sign-in page if not authenticated
  }, [session, status]);

  const handleSubmit = async()=>{
    // console.log("author id"+ authurId);
    
    const postId = await postblog(title,content,authurId);
    
    const formData = new FormData();
    formData.append('file', selectedFile!);

    const imageUrl = await UploadFile(formData);

    const coverFormData = new FormData();
    formData.append('file', coverFile!);

    const coverImageUrl = await UploadFile(formData);

    // console.log(postId);
    // console.log(imageUrl);
    const postcreated = await addImg(postId, imageUrl, coverImageUrl);
    if(postcreated){
      setSelectedFile(null)
      setTitle("");
      setContent("");
      alert("post created")
    } else {
      alert("error while creating post")
    }

  }
  return (
    <div className='flex justify-center'>
      <div className='w-2/5 p-10 border rounded-3xl border-gray'>
        <div className='mb-4'>
          <h2 className='text-3xl font-semibold text-gray font-sans'>Write your stroy here</h2>
        </div>
        <div className=''>
          <Input label='Title' placeholder='Write your title' type='text' onchane={(e)=>{setTitle(e)}}/>
        </div>
        {/* <div className=''>
          <Input label='Subtitle' placeholder='Write your Subtitle' type='text' onchane={(e)=>{setSubtitle(e)}}/>
        </div> */}
        <div className=''>
          <Input label='Your story' placeholder='Write your story here' type='text' onchane={(e)=>{setContent(e)}}/>
        </div>
        <ImageInput title='Images' id='imageInput' onchane={(e)=>{setSelectedFile(e)}}/>
        <ImageInput title='Cover' id='coverInput' onchane={(e)=>{setCoverFIle(e)}}/>
        <Button title="Submit" onclick={handleSubmit}/>
      </div>
    </div>
  )
}

export default Postcreate