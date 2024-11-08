export interface Data {
  currentUser: User,
  comments: Array<Comments>
}

export interface Comments {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Array<Replies>;
}

export interface Replies extends Omit<Comments, 'replies'> {
  replyingTo: string;
}

export interface User {
  image: {
    png: string, 
    webp: string
  },
  username: string
}