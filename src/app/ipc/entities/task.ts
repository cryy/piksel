import { TaskPriority } from ".";

export interface Task {
    id: number;
    name: string;
    description?: string;
    done: boolean;
    priority: TaskPriority;
}