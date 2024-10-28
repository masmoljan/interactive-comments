import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircleReply, CircleUser, Plus, Minus, Send } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";


interface CommentProps {
  id: number;
  username: string;
  createdAt: string;
  content: string;
  score: number;
  handleScoreChange: (id: number) => void;
}


export default function Comment({id, username, createdAt, content, score, handleScoreChange }: CommentProps) {

  const [toggleReply, setToggleReply] = useState(false)
  const handleOpenReply = () => {
    setToggleReply(!toggleReply)
  }

  return (
		<div className="p-2 flex flex-col gap-4">
			<Card className="rounded-xl flex flex-row">
        <div className="ml-4 flex flex-col items-center bg-slate-200 rounded-xl max-h-28 self-center" role="group">
          <Button variant="ghost" size="icon" onClick={() => handleScoreChange(id)}>
            <Plus className="h-4 w-4" />
          </Button>
          <p className="py-1 font-semibold text-slate-700">{score}</p>
          <Button variant="ghost" size="icon">
            <Minus className="h-4 w-4"/>
          </Button>
        </div>
        <div className="flex-row">
				<CardHeader>
          <CardTitle className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                <CircleUser />
              </AvatarFallback>
            </Avatar>
            <p className="">{username}</p>
            <p className="text-sm text-muted-foreground">{createdAt}</p>
            <Button className="ml-auto" variant="ghost" size="default" onClick={() => handleOpenReply()}>
              <MessageCircleReply />
              <p className="font-semibold text-base">Reply</p>
            </Button>
          </CardTitle>
				</CardHeader>
				<CardContent>
					<p>{content}</p>
				</CardContent>
        </div>
			</Card>
      {toggleReply && (
        <Card>
          <CardHeader>
          <CardTitle className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                <CircleUser />
              </AvatarFallback>
            </Avatar>
            <p className="">{username}</p>
          </CardTitle>
				</CardHeader>
        <CardContent className="flex items-center gap-4">
          <Textarea className="max-h-32" placeholder="Enter your reply"></Textarea>
          <Button className="ml-auto" onClick={() => handleOpenReply()}>
              <Send />
              <p className="font-semibold text-base">Send</p>
            </Button>
        </CardContent>
        </Card>
      )}
		</div>
  )
}