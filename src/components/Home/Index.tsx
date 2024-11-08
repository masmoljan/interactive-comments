import { Separator } from "@/components/ui/separator";
import { usePersistentData } from "@/hooks";
import {
  createCommentBody,
  createReplyBody,
  deleteComment,
  updateComment,
  updateCommentScore,
  updateReply,
  updateReplyScore
} from "@/utils/helpers";
import file from '../../../data.json';
import { Comments } from "../../types";
import Comment from '../Comment/Index';
import Reply from '../Comment/Reply';


const Home = () => {

  const [data, setData] = usePersistentData(file, 'data');

  const handleScoreChange = (commentId: string, score: number) => {
    const foundComment = data.comments
      .find((comment : Comments) => comment.id === commentId);
    const foundReply = data.comments
      .some((comment : Comments) => comment.replies
      .find((reply) => reply.id === commentId));

    if (foundComment) {
      const updatedCommentScore = updateCommentScore(data.comments, commentId, score);
      setData({...data, updatedCommentScore});
    }

    if (foundReply) {
      const updatedReplyScore = updateReplyScore(data.comments, commentId, score);
      setData({...data}, updatedReplyScore);
    }
  };

  const handleCreate = (content: string) => {
    const newComment = createCommentBody(content, data.currentUser);

    data.comments.push(newComment);
    setData({...data});
  };

  const handleCreateReply = (
    commentId: string, 
    content: string, 
    replyingTo: string
  ) => {
    const existingComment = data.comments
      .find((comment : Comments) => comment.id === commentId);

    if(!existingComment) return;

    const newReply = createReplyBody(content, replyingTo, data.currentUser);

    existingComment.replies.push(newReply);
    setData({...data});
  };

  const handleCommentUpdate = (id: string, content: string) => {
    const updatedComment = updateComment(data.comments, id, content);
    setData({...data, updatedComment});
  };

  const handleReplyUpdate = (id: string, content: string) => {
    const updatedReply = updateReply(data.comments, id, content);
    setData({...data, updatedReply});
  };

  const handleDelete = (id: string) => {
    const filteredComment = deleteComment(data.comments, id);
    setData({...data, comments: filteredComment});
  };

  return (
    <div className=" bg-slate-100 p-4 dark:bg-slate-800">
      {data?.comments?.map((comment : Comments) => (
        <div key={comment.id}>
          <Comment
            id={comment.id} 
            createdAt={new Date(comment.createdAt)}
            content={comment.content}
            score={comment.score}
            user={comment.user}
            handleScoreChange={handleScoreChange}
            currentUser={data.currentUser}
            handleDelete={handleDelete}
            handleCommentUpdate={handleCommentUpdate}
            handleCreateReply={handleCreateReply}
          />
          {comment.replies.length > 0 && 
            <div className="flex">
              <Separator orientation="vertical" className="mx-4 h-auto w-1" />
              <div className="flex-col w-full">
                {comment.replies.map((reply) => (
                  <Comment 
                    id={comment.id}
                    replyId={reply.id}
                    createdAt={new Date(reply.createdAt)}
                    content={reply.content}
                    score={reply.score}
                    replyingTo={reply.replyingTo}
                    user={reply.user}
                    handleScoreChange={handleScoreChange}
                    currentUser={data.currentUser}
                    handleDelete={handleDelete}
                    handleCommentUpdate={handleReplyUpdate}
                    key={reply.id}
                    handleCreateReply={handleCreateReply}
                  />
                ))            
                }
              </div>
            </div>
          }
        </div>
      ))}
      <Reply 
        user={data.currentUser}
        replyTo={data.currentUser.username} 
        handleCreate={handleCreate}
      />
    </div>
  );
};

export default Home;