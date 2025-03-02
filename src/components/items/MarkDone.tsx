import { toaster } from "@/components/ui/toaster";
import { Tooltip } from "@/components/ui/tooltip";
import { updateGoal } from "@/firebase/services";
import { Goal } from "@/helpers/types";
import { Badge, IconButton } from "@chakra-ui/react";
import { MdDoneAll } from "react-icons/md";

interface MarkDoneProps {
    goal: Goal
}


const MarkDone = ({ goal }: MarkDoneProps) => {
    const handleMarkDone = async (docId: string, docTitle: string) => {
        await updateGoal(docId, { completed: true });
        toaster.create({
          title: "Marked Complete!",
          description: `Goal ${docTitle} marked as complete`,
          type: "success",
        });
      };

    return (
    
        goal.completed ? (
            <Badge variant="solid" size="lg" colorPalette="green">
              Completed
            </Badge>
          ) : (
            <Tooltip content="Mark as Done">
              <IconButton
                variant="outline"
                color="green"
                aria-label="Mark Done"
                onClick={(e) =>
                  handleMarkDone(goal.docId, goal.title)
                }
              >
                <MdDoneAll />
              </IconButton>
            </Tooltip>
          )
    
    )
}

export default MarkDone;