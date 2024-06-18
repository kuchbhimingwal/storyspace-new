import client from '@/db'
import { getServerSession } from 'next-auth'
import { authProvider } from '../lib/auth';
import AddComment from './AddComment';
async function getSession() {
  const session = await getServerSession(authProvider);
  return session;
}
async function getComments(postId:string) {
  const comments = await client.comment.findMany({
    where:{
      articleId: postId
    },
    include:{
      author:true
    }
  })
  return comments
}
async function CommentSection({postId}: {postId: string}) {
  const session = await getSession();
  const userId = session.user.id;
  const comments = await getComments(postId);
  console.log(comments);
  
  return (
    <div className='flex justify-center'>
      <div className='w-2/5 p-10 border rounded-3xl border-gray'>
      <h1 className='font-medium text-2xl text-gray'> Comments {comments.length}</h1>
      <div>
        {comments.map((comment)=>(
          <div className='flex my-5'>
            <div className=''>

            <div className='flex items-center justify-center text-lg mr-2 bg-black text-white rounded-full w-8 h-8  text-center'>{comment.author?.fisrname.charAt(0)}</div>
            </div>
            <div>
              <div className='font-bold text-lg'>{comment.author.fisrname} .<span className='font-light text-xs pl-2'>{comment.createdAt.toDateString()}</span></div>
              <div className='text-gray py-3'>{comment.text}</div>
            </div>
          </div>
        ))}
      </div>
      <AddComment postId={postId} authurId={userId} />
    </div>
    </div>
  )
}

export default CommentSection