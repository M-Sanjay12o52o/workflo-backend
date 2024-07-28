import { Task } from "../models/task";
import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = Router();
let tasks: Task[] = [];

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required').isString().withMessage('Invalid value for title'),
    body('description').notEmpty().withMessage('Description is required').isString().withMessage('Invalid value for description'),
    body('status').notEmpty().withMessage('Status is required').isString().withMessage('Invalid value for status'),
    body('priority').isInt({ min: 1 }).withMessage('Priority must be a positive integer'),
    body('deadline').isISO8601().toDate().withMessage('Deadline must be a valid date')
];

// Create a new task
router.post('/', taskValidationRules, (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const task: Task = {
        id: Date.now().toString(),
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        deadline: req.body.deadline,
    };

    tasks.push(task);

    res.status(201).json(task);
});

// Update an existing task
router.put('/:id', taskValidationRules, (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const task = tasks.find((t) => t.id === req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    } else {
        task.title = req.body.title;
        task.description = req.body.description;
        task.status = req.body.status;
        task.priority = req.body.priority;
        task.deadline = req.body.deadline;

        res.status(200).json(task);
    }
});

// Get all tasks
router.get('/', (req: Request, res: Response) => {
    res.status(200).json(tasks);
});

// Get a specific task by ID
router.get("/:id", (req: Request, res: Response) => {
    const task = tasks.find((t) => t.id === req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    } else {
        res.status(200).json(task);
    }
});

// Delete a task by ID
router.delete('/:id', (req: Request, res: Response) => {
    const index = tasks.findIndex((t) => t.id === req.params.id);

    if (index === -1) {
        res.status(404).json({ message: 'Task not found' });
    } else {
        tasks.splice(index, 1);
        res.status(200).json({ message: 'Task deleted' });
    }
});

export default router;
