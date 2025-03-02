
import { Goal } from "@/helpers/types";
import { AbsoluteCenter, ProgressCircle } from "@chakra-ui/react";

interface GoalProgressProps {
    goal: Goal
}


const GoalProgress = ({ goal }: GoalProgressProps) => {

    return (
    
        <ProgressCircle.Root
        color={goal.severityColor}
        value={
          goal.completed
            ? 100
            : (goal.progress / goal.target) * 100
        }
      >
        <ProgressCircle.Circle>
          <ProgressCircle.Track />
          <ProgressCircle.Range stroke={goal.severityColor} />
        </ProgressCircle.Circle>
        <AbsoluteCenter>
          <ProgressCircle.ValueText />
        </AbsoluteCenter>
      </ProgressCircle.Root>
    
    )
}

export default GoalProgress;