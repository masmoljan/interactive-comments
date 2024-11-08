import { Minus, Plus } from "lucide-react";
import IconButton from "../Buttons/IconButton";

interface RatingProps {
  id: string
  replyId?: string
  score: number
  handleScoreChange: (id: string, score: number) => void;
}

export default function Rating({ 
  id, 
  replyId, 
  score, 
  handleScoreChange 
} : RatingProps) {


  return (
    <div 
      className="ml-4 flex flex-col items-center bg-slate-200 rounded-xl max-h-28 self-center" 
      role="group"
    >
      <IconButton 
        variant="ghost" 
        size="icon" 
        onClick={() => handleScoreChange(replyId || id, score + 1)}
        icon={<Plus className="h-4 w-4"/>}
      />
      <p className="py-1 font-semibold text-slate-700">{score}</p>
      <IconButton 
        variant="ghost" 
        size="icon" 
        onClick={() => handleScoreChange(replyId || id, score - 1)}
        icon={<Minus className="h-4 w-4"/>}
      />
    </div>
  );
}