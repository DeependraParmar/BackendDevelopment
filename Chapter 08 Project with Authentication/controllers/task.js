import ErrorHandler from '../middlewares/error.js';
import {Task} from '../models/task.js';


export const newTask = async (req, res,next) => {
    try {
        const { title, description } = req.body;
        const task = await Task.create({
            title,
            description,
            user: req.user._id
        });
        return res.status(201).json({
            success: true,
            message: "Task created successfully",
        });
    } catch (error) {
        next(error);
    }
}

export const getAllTasks = async (req, res,next) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        return res.status(200).json({
            success: true,
            tasks
        });
    } catch (error) {
        next(error);
    }
}
export const updateTask = async (req, res,next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task)
            return next(new ErrorHandler("Task not found", 404));

        task.isCompleted = !task.isCompleted;
        await task.save();


        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
        });
    } catch (error) {
        next(error);
    }
}
export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task)
            return next(new ErrorHandler("Task not found", 404));

        await task.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}