import React from 'react'
import Postpage from '@/app/components/Postpage';
async function page({
  params
}: {
  params: { postId: string }
}) {
  const postId = params.postId;
  return (
    <div>
      <Postpage postId={postId} />
    </div>
  )
}

export default page