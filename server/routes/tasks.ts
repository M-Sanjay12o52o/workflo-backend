import { TaskModel } from "../models/task";
import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import taskValidationRules from "./taskvalidation";

const router = Router();

// Create a new task
router.post('/', taskValidationRules, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, priority, deadline } = req.body;

    console.log("backend: ", title, description, status, priority, deadline);

    try {
        const task = new TaskModel({ title, description, status, priority, deadline });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error('Error saving task:', error);
        res.status(500).json({ message: 'Failed to create task' });
    }
});

// Update an existing task
router.put('/:id', taskValidationRules, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, priority, deadline } = req.body;

    try {
        const task = await TaskModel.findByIdAndUpdate(
            req.params.id,
            { title, description, status, priority, deadline },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Failed to update task' });
    }
});

// Get all tasks
router.get('/', async (req: Request, res: Response) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Failed to get tasks' });
    }
});

// Get a specific task by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const task = await TaskModel.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        } else {
            res.status(200).json(task);
        }
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ message: 'Failed to get task' });
    }
});

// Delete a task by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const task = await TaskModel.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        } else {
            res.status(200).json({ message: 'Task deleted' });
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Failed to delete task' });
    }
});

export default router;
