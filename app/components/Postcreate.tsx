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
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
function Postcreate() {
  const { data: session, status } = useSession();
  //@ts-ignore
  const authurId = session?.user?.id;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [title , setTitle] = useState("");
  const [subtitle , setSubtitle] = useState("");
  const [content , setContent] = useState("");
  const [editorValue, setEditorVlaue] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) redirect("/signin"); // Redirect to sign-in page if not authenticated
  }, [session, status]);

  const handleSubmit = async()=>{
    // console.log("author id"+ authurId);
    
    const postId = await postblog(title,subtitle,content,authurId);
    if(postId){
      const formData = new FormData();
      formData.append('file', selectedFile!);
  
      const imageUrl = await UploadFile(formData);
  
      const coverFormData = new FormData();
      coverFormData.append('file', coverFile!);
  
      const coverImageUrl = await UploadFile(coverFormData);
  
      // console.log(imageUrl);
      // console.log(coverImageUrl);
      const postcreated = await addImg(postId, imageUrl, coverImageUrl);
      if(postcreated){
        setSelectedFile(null)
        setTitle("");
        setContent("");
        alert("post created")
      } else {
        alert("error while adding the image link to the db")
      }
    } else {
      alert("error while creating the post");
    }
  }

  // console.log(editorValue);
  
  return (
    <div className='flex justify-center'>
      <div className='w-full m-3 md:m-0 md:w-4/5 p-3 md:p-10 border rounded-3xl border-gray'>
        <div className='mb-4'>
          <h2 className='text-3xl font-semibold text-gray font-sans mt-3 md:mt-0'>Write your stroy here</h2>
        </div>
        <div className=''>
          <Input label='Title' placeholder='Write your title' type='text' onchane={(e)=>{setTitle(e)}}/>
        </div>
        <div className=''>
          <Input label='Subtitle' placeholder='Write your Subtitle' type='text' onchane={(e)=>{setSubtitle(e)}}/>
        </div>
        <div className='mt-3'>
          {/* <Input label='Your story' placeholder='Write your story here' type='text' onchane={(e)=>{setContent(e)}}/> */}
          <p className="w-full text-gray font-medium py-3 text-sm font-sans">Your Story</p>
          <Editor
              onEditorChange={(newValue, editor)=>{
                setContent(newValue)
              }}
              apiKey='c395paraunmx9lm4o237g3xd20nps1vo6b4p6ue1co1rd0cs'
              init={{
                plugins: 'anchor autolink charmap codesample emoticons lists searchreplace table visualblocks wordcount linkchecker markdown',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
              }}
              initialValue="Write your story here!"
            />
        </div>
        <ImageInput title='Images' id='imageInput' onchane={(e)=>{setSelectedFile(e)}}/>
        <ImageInput title='Cover' id='coverImageInput' onchane={(e)=>{setCoverFile(e)}}/>
        <Button title="Submit" onclick={handleSubmit}/>
      </div>
      
    </div>
  )
}

export default Postcreate