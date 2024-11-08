import { Comments } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const createCommentBody = (content: string, user: string) => {
  const newComment = {
    id: uuidv4(),
    content,
    createdAt: new Date().toISOString(),
    score: 0,
    user,
    replies: []
  };

  return newComment;
};

export const createReplyBody = (content: string, replyingTo: string, user: string) => {
  const newReply = {
    id: uuidv4(),
    content,
    createdAt: new Date().toISOString(),
    score: 0,
    replyingTo,
    user
  };

  return newReply;
};

export const updateCommentScore = (comments: Array<Comments>, commentId: string, score: number) => {
  comments.map((comment : Comments) => {
    if (comment.id === commentId) {
      comment.score = score;
    }
    return comment;
  });
  comments.sort((a : Comments, b : Comments) => b.score - a.score);
};

export const updateReplyScore = (comments: Array<Comments>, commentId: string, score: number) => {
  comments.forEach((comment : Comments) => {
    comment.replies.map((reply) => {
      if(reply.id === commentId) {
        reply.score = score;
      }
      return comment;
    });
    comment.replies.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
  });
};

export const updateComment = (comments: Array<Comments>, commentId: string, content: string) => {
  comments.map((comment : Comments) => {
    if(comment.id === commentId) {
      comment.content = content;
      return comment;
    }
  });
};

export const updateReply = (comments: Array<Comments>, replyId: string, content: string) => {
  comments.forEach((comment: Comments) => {
    comment.replies.map(reply => {
      if (reply.id === replyId) {
        reply.content = content;
        return reply;
      }
    });
  });
};

export const deleteComment = (comments: Array<Comments>, id: string) => {
    comments = comments.filter((comment : Comments) => comment.id !== id);

    comments.map((comment : Comments) => {
      comment.replies = comment.replies.filter(reply => reply.id !== id);
    });

  return comments;
};