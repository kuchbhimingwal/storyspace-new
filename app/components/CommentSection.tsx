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
    <div>
      <div>
        {comments.map((comment)=>(
          <div>{comment.text}</div>
        ))}
      </div>
      <AddComment postId={postId} authurId={userId} />
    </div>
  )
}

export default CommentSection