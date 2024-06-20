import React from 'react'

interface prop {
  id:string;
  onchane: (value:File)=>void;
  title: string;
}
function ImageInput({id, onchane, title}:prop) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    if (event.target.files && event.target.files.length > 0){
    onchane(event.target.files[0])
    }
  }
  return (
    <div>
      <div className="flex items-center justify-center w-full my-4">
          <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray border-dashed rounded-lg cursor-pointer ">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray"><span className="font-semibold">Click to upload {title}</span> or drag and drop</p>
                  <p className="text-xs text-gray">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id={id} type='file' accept='image/*' onChange={handleChange} className="hidden"/>
          </label>
      </div> 

    </div>
  )
}

export default ImageInput