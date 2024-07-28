export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    priority?: number;
    deadline?: Date;
}