import React from 'react'
import ReadPage from '@/app/components/ReadPage'
function page() {
  return (
    <div>
      <div className='text-center mt-5 md:mt-0'>
        <a href="" className='text-gray text-xl font-medium p-1'>Following</a>
        <span className='text-gray font-bold'>|</span>
        <a href="" className='text-mainpurple text-xl font-medium p-1'>Categories</a>
      </div>
      <ReadPage />
    </div>
  )
}

export default page