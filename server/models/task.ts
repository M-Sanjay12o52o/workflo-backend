import mongoose, { Document, Schema } from "mongoose";

interface Task extends Document {
    title: string;
    description: string;
    status: string;
    priority?: number;
    deadline?: Date;
}

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: Number, required: false },
    deadline: { type: Date, required: false },
})

const TaskModel = mongoose.model<Task>('Task', taskSchema);

export { TaskModel };