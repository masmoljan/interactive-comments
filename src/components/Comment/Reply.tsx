import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTruncate } from "@/hooks";
import { User } from "@/types";
import { BUTTONS, INFO, TEXT } from "@/utils/constants";
import { CircleUser, Send } from "lucide-react";
import Content from "./Content";

interface ReplyProps {
  commentId?: string;
  handleCreate?: (input: string) => void;
  handleCreateReply?: (id: string, content: string, replyingTo: string) => void;
  handleOpenReply?: () => void;
  replyTo: string;
  user: User,
}

export default function Reply ({ 
  commentId,
  handleCreate,
  handleCreateReply,
  handleOpenReply, 
  replyTo, 
  user
} : ReplyProps) {

  const { input, setValue } = useTruncate();

  return (
    <Card className="flex items-center">
      <CardHeader>
        <CardTitle>
          <Avatar>
            <AvatarImage src={user?.image?.png}/>
            <AvatarFallback>
              <CircleUser />
            </AvatarFallback>
          </Avatar>
        </CardTitle>
      </CardHeader>
      <div className="flex-col w-full">
        <CardContent className="flex gap-4 items-center pt-6 pb-0 pl-0">
          {handleOpenReply && handleCreateReply && commentId && (
            <>
              <Content 
                textClassName="resize-none text-base min-h-28" 
                placeholder={TEXT.ENTER_REPLY}
                autoFocus
                value={input}
                onChange={(e) => setValue(e.target.value)}
                onClick={() => { 
                  handleCreateReply(commentId, input, replyTo);
                  handleOpenReply();
                  setValue("");
                }}
                disabled={!input}
                text={BUTTONS.REPLY}
              />
            </>
          )}
          {handleCreate && (
            <>
              <Content 
                textClassName="resize-none text-base min-h-28" 
                placeholder={TEXT.ENTER_COMMENT}
                onChange={(e) => setValue(e.target.value)}
                value={input}
                type="submit"
                onClick={() => {
                  handleCreate(input);
                  setValue("");
                }}
                disabled={!input.length}
                icon={<Send />}
                text={BUTTONS.SEND}
              />
            </>
          )}
        </CardContent>
        <p className="text-sm text-muted-foreground pt-2 pb-2">
          {INFO.REPLY_LENGTH}
        </p>
      </div>
    </Card>
  );
}