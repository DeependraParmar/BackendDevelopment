// In this, we are going to see about API Development,  Dynamic Routing and Model View Controller (MVC) Architecture. It is a purely backend development in order ot make the code clean and maintainable along with increased readablity.

import express from 'express';
import { config } from 'dotenv';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors';

config({ path: './data/config.env' });

// creating the app 
export const app = express();


// using the middlewares here 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}
));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);


// specifying all the routes here 
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// error middleware for handling errors 
app.use(errorMiddleware);