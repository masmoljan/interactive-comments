import Comment from './components/Comment'
import './App.css'

import file from '../data.json'
import { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator"




const App = () => {

  const [data, setData] = useState(file);

  const handleScoreChange = (commentId: number) => {
    const foundComment = data.comments.find((comment) => comment.id === commentId);
    const foundReply = data.comments.some((comment) => comment.replies.find((reply) => reply.id === commentId));

    if (foundComment) {
      const updatedComment = data.comments.map((comment) => {
        if (comment.id === commentId) {
          comment.score += 1
        }
        return comment
      })
      setData({...data, comments: updatedComment.sort((a, b) => b.score - a.score)});
    }

/*     if (foundReply) {
      const updatedReply = data.comments.map((comment) => {
        comment.replies.map((reply) => {
          if(reply.id === commentId) {
            reply.score += 1
          }
          return comment
        })
        setData({...data, comments: updatedReply})
      })
    } */
  }

/*   deleteCards(listId, cardId) {
    this.setState(prevState => ({
      lists: prevState.lists.map((list) => {
  
        return {
          ...list,
          cards: list.cards.filter(card => card.id !== cardId) 
        }
      })
    }))
  } */




  return (
    <div className="max-w-3xl bg-slate-100 p-4 dark:bg-slate-800">
{/*       {data.comments.map((comm) => {
        return !comm.replies.length ? (
          <Comment 
            username={comm.user.username}
            createdAt={comm.createdAt}
            content={comm.content}
          />
        ) :
        comm.replies.map((reply) => {
          const { user, createdAt, content } = reply;
          return (
            <>
              <Comment 
                username={user.username}
                createdAt={createdAt}
                content={content}
              >
              </Comment>
            </>
          )
        })
    }
      )} */}

        {data?.comments?.map((comment) => (
          <>
            <Comment
            id={comment.id} 
            username={comment.user.username}
            createdAt={comment.createdAt}
            content={comment.content}
            score={comment.score}
            handleScoreChange={handleScoreChange}
            />
            {comment.replies.length > 0 && 
              <div className="flex">
                <Separator orientation="vertical" className="mx-4 h-auto w-1" />
                  <div className="flex-col">
                    {comment.replies.map((reply) => (
                        <Comment 
                        id={reply.id}
                        username={reply.user.username}
                        createdAt={reply.createdAt}
                        content={reply.content}
                        score={reply.score}
                        handleScoreChange={handleScoreChange}
                        />
                      ))            
                    }
                </div>
              </div>
            }
          </>
        ))}




    </div>
  );
}

export default App;
