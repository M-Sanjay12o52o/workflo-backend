import mongoose, { Document, Schema } from "mongoose";

interface Task extends Document {
    title: string;
    description?: string;
    status: string;
    priority?: string;
    deadline?: string;
}

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, required: true },
    priority: { type: String, required: false },
    deadline: { type: String, required: false },
})

const TaskModel = mongoose.model<Task>('Task', taskSchema);

export { TaskModel };