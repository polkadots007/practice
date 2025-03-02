import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toaster } from "@/components/ui/toaster";
import { deleteGoal } from "@/firebase/services";
import { Button, IconButton } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { Goal, NewGoalProps } from "@/helpers/types";

interface DeleteProps {
  goal: Goal;
}

const DeleteGoal = ({ goal }: DeleteProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenDialog = () => {
    setOpen((prev: boolean) => !prev);
  };
  const handleDelete = async (docId: string, docTitle: string) => {
    await deleteGoal(docId);
    toaster.create({
      title: "Deletion Complete!",
      description: `Goal ${docTitle} deleted`,
      type: "success",
    });
  };

  return (
    <DialogRoot open={open}>
      <DialogTrigger asChild>
        <Tooltip content="Delete Goal">
          <IconButton
            variant="outline"
            color="red"
            aria-label="Delete Goal"
            onClick={handleOpenDialog}
          >
            <AiOutlineDelete />
          </IconButton>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle color="red">Delete Goal</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {`Are you sure you want to delete Goal `}
          <b>{goal.title}</b> {" ?"}
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={handleOpenDialog}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            colorPalette="red"
            onClick={(e) => handleDelete(goal.docId, goal.title)}
          >
            Delete
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default DeleteGoal;
