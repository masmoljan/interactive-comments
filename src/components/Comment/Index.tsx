import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToggleEdit, useToggleReply, useTruncate } from "@/hooks";
import { User } from "@/types";
import { BUTTONS, TEXT } from "@/utils/constants";
import Content from "./Content";
import Header from "./Header";
import Rating from "./Rating";
import Reply from "./Reply";

interface CommentProps {
  content: string;
  createdAt: number | Date;
  currentUser: User;
  handleCommentUpdate: (id: string, content: string) => void;
  handleCreateReply: (id: string, content: string, replyingTo: string) => void;
  handleDelete: (id: string) => void;
  handleScoreChange: (id: string, score: number) => void;
  id: string;
  replyId?: string;
  replyingTo?: string,
  score: number;
  user: User;
}

export default function Comment({ 
  content, 
  createdAt, 
  currentUser,
  handleCommentUpdate,
  handleCreateReply,
  handleDelete,
  handleScoreChange, 
  id,
  replyId, 
  replyingTo,
  score, 
  user
} : CommentProps) {

  const { toggleReply, setReply } = useToggleReply();
  const { toggleEdit, setEdit } = useToggleEdit();
  const { input, setValue } = useTruncate();
  
  return (
		<div className="p-2 flex flex-col gap-4">
			<Card className="rounded-xl flex flex-row">
        <Rating 
          id={id}
          replyId={replyId}
          score={score}
          handleScoreChange={handleScoreChange}
        />
        <div className="flex-row w-full">
          <CardHeader>
            <CardTitle className="flex gap-4 items-center">
              <Header 
                id={id}
                replyId={replyId}
                createdAt={createdAt}
                user={user}
                currentUser={currentUser.username}
                handleDelete={handleDelete}
                handleOpenReply={setReply}
                handleOpenEdit={setEdit}
                toggleEdit={toggleEdit}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentUser.username === user.username && toggleEdit ? 
            <div className="flex flex-row items-center gap-4">
              <Content
                textClassName="resize-none min-h-20 text-base" 
                placeholder={TEXT.ENTER_REPLY}
                defaultValue={content || input}
                onChange={(e) => setValue(e.target.value)}
                disabled={!content.length || !input.length}
                onClick={() => {
                  handleCommentUpdate(replyId || id, input); 
                  setEdit();
                }}
                text={BUTTONS.UPDATE}
              />
            </div>
            :
              <p className="min-h-fit overflow-y-auto text-base text-justify break-all p-0.5">
                {replyingTo && "@" + replyingTo + ", "}{content}
              </p>
            }
          </CardContent>
        </div>
			</Card>
      
      {toggleReply && (
        <Reply 
          replyTo={user.username} 
          user={currentUser}
          handleOpenReply={setReply}
          commentId={id}
          handleCreateReply={handleCreateReply}
        />
      )}

		</div>
  );
}