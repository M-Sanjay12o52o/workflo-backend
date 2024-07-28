import express, { NextFunction, Request, Response } from 'express';
import taskRoutes from "./routes/tasks"
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

// middleware to parse JSON bodies
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/tasks', taskRoutes);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World!' });
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});