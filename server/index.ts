import express, { NextFunction, Request, Response } from 'express';
import taskRoutes from "./routes/tasks"
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3001;

// middleware to parse JSON bodies
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// connect to MongoDB
// const mongoUrl = process.env.MONGO_URL;
const mongoUrl = "mongodb://localhost:27017/workflow";
if (!mongoUrl) {
    throw new Error('MONGO_URL environment variable is not set');
}

mongoose.set('strictQuery', false);

mongoose.connect(mongoUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

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