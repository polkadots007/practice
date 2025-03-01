export interface GoalDocProps {
    category: string;
    completed: boolean;
    createdBy: string;
    description: string;
    image: string;
    progress: number;
    target: number;
    severityColor: string;
    title: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    }
}

export interface Goal extends GoalDocProps{
    id: string;
}

export interface NewGoalProps {
    id: string;
    category: string;
    completed: boolean;
    createdBy: string;
    description: string;
    image: string;
    progress: number;
    target: number;
    severityColor: string;
    title: string;
    priority: string;
}


export interface categoryProps {
    [key: string] : {
        severityColor: string;
        priority : 'High' | 'Low' | 'Medium'
    }
}