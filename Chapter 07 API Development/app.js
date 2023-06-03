// In this, we are going to see about API Development,  Dynamic Routing and Model View Controller (MVC) Architecture. It is a purely backend development in order ot make the code clean and maintainable along with increased readablity.

import express from 'express';
import {config} from 'dotenv';

config({path: './data/config.env'});

// creating the app 
export const app = express();
const userRouter = express.Router();


// using the middlewares here 
app.use(express.json());
app.use(userRouter);

// specifying all the routes here 
app.get('/', (req, res) => {
    res.send('Hello World!');
});
