import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
const app = express();
dotenv.config();
import connectDB from './database/configDB';
connectDB(process.env.DB_URI!);
const PORT = process.env.PORT || 8000;
import teacherRouter from './routes/teacher.route';
import errorHandlerMiddleware from './middlewares/errorMiddleware';





// Middleware : 

// cors config : 
app.use(cors({
    origin: [
        "http://localhost:5173", // Development frontend
        "https://omni-data-x.vercel.app" // Production frontend URL
    ],
    methods: ["GET", "POST"], // Ensure GET and POST methods are allowed
    credentials: true, // Allow cookies and credentials to be sent
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req: Request, res: Response, next) => {
    console.log('Request Headers:', req.headers);

    const origin = req.headers.origin || 'Unknown Origin';
    const referer = req.headers.referer || 'No Referer';

    console.log(`Request Origin: ${origin}`);
    console.log(`Request Referer: ${referer}`);
    next();
});


app.use("/api", teacherRouter);
app.use(errorHandlerMiddleware); //<-- ErrorHandler middleware 




app.listen(PORT, () => {
    console.log(`App is runnning at http://localhost:${PORT}`);
});