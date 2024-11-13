import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { BUTTONS, TEXT } from "@/utils/constants";
import { Button } from "../ui/button";

interface DeleteProps {
  commentId: string;
  handleDelete: (id: string) => void;
  open: boolean;
  setDelete: () => void;
}

export default function Delete({ 
  commentId, 
  handleDelete,
  open, 
  setDelete
} : DeleteProps) {

  return (
    <Dialog open={open} onOpenChange={() => setDelete()}>
      <DialogContent className="max-w-fit rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-slate-900 text-center">
            {TEXT.DELETE_COMMENT}
          </DialogTitle>
          <DialogDescription className="text-justify pt-3 pb-3">
            {TEXT.DELETE}
          </DialogDescription>
          <DialogFooter 
            className="flex flex-row gap-2 justify-center sm:justify-center"
          >
            <Button 
              className="uppercase"
              type="submit" 
              onClick={() => {
                setDelete();
              }}
              >
              {BUTTONS.CANCEL_DELETE}
            </Button>
            <Button 
              className="uppercase"
              type="submit" 
              onClick={() => {
                setDelete();
                handleDelete(commentId);
              }}
            >
              {BUTTONS.CONFIRM_DELETE}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}