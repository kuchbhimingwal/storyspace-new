import React from 'react'
import CommentSection from '@/app/components/CommentSection';
function page({
  params
}: {
  params: { postId: string }
}) {

  const postId = params.postId;
  return (
    <CommentSection postId={postId} />
  )
}

export default page