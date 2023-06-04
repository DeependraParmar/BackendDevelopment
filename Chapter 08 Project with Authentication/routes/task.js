import express from 'express';
import { newTask, getAllTasks, updateTask, deleteTask } from '../controllers/task.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// create a new task
router.post('/new',isAuthenticated, newTask);

// get all tasks 
router.get('/all',isAuthenticated, getAllTasks);

// update and delete the task 
router.route('/:id').put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask); 


export default router;