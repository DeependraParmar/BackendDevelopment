import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find();
    console.log(req.query); // getting the query params here
    const keyword = req.query.keyword;
    console.log(keyword); // getting the keyword here
    res.json({
        success: true,
        users
    });
}

export const getNewUser = async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    res.status(201).json({
        success: true,
        message: "User created successfully"
    });
}

export const getSpecialUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    console.log(req.params)
    res.json({
        success: true,
        user
    });
}