import { useToggleDelete } from "@/hooks";
import { User } from "@/types";
import { BUTTONS } from "@/utils/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  CircleUser,
  MessageCircleReply,
  Pencil,
  Trash2
} from "lucide-react";
import ReactTimeAgo from 'react-time-ago';
import IconButton from "../Buttons/IconButton";
import { Badge } from "../ui/badge";
import Delete from "./Delete";


interface HeaderProps {
  createdAt: number | Date;
  currentUser: string;
  handleDelete: (id: string) => void;
  handleOpenEdit: () => void;
  handleOpenReply: () => void;
  id: string;
  replyId?: string;
  toggleEdit: boolean,
  user: User,
}

export default function Header({ 
  createdAt,
  currentUser,
  handleDelete,
  handleOpenEdit,
  handleOpenReply,
  id,
  replyId,
  toggleEdit,
  user
} : HeaderProps) {

  const { toggleDelete, setDelete } = useToggleDelete();

  return (
    <>
      <Avatar>
      <AvatarImage 
        className="h-10 w-10" 
        src={`${user.image.png}` || `${user.image.webp}`} 
      />
        <AvatarFallback>
          <CircleUser />
        </AvatarFallback>
      </Avatar>
      <p>{user.username}</p>
      {currentUser === user.username && <Badge>you</Badge>}
      <p 
        className="text-sm text-muted-foreground"
      >
        <ReactTimeAgo date={createdAt}/>
      </p>
      {currentUser !== user.username ? 
        <IconButton 
          className="ml-auto" 
          variant="ghost" 
          size="default" 
          onClick={() => handleOpenReply()}
          icon={<MessageCircleReply />}
          text={BUTTONS.REPLY}
        />
      : 
        <div className="flex ml-auto gap-2">
          <IconButton 
            className="bg-inherit text-red-700" 
            variant="ghost" 
            disabled={toggleEdit} 
            onClick={() => setDelete()}
            icon={<Trash2 />}
            text={BUTTONS.DELETE}
          />
          <IconButton 
            className="bg-inherit" 
            variant="ghost" 
            disabled={toggleEdit} 
            onClick={() => handleOpenEdit()}
            icon={<Pencil />}
            text={BUTTONS.EDIT}
          />
          <Delete 
            open={toggleDelete} 
            setDelete={setDelete} 
            commentId={replyId || id} 
            handleDelete={handleDelete}
          />
        </div>
      }
  </>
  );
}