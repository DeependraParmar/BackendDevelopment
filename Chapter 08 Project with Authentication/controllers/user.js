import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";


// ************ 1. Get all users ************
export const getAllUsers = async (req, res,next) => {
    try {
        const user = await User.find();
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}


// ************ 2. Creating a new user ************
export const userRegister = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        //if user already exists, return error
        if (user) {
            return next(new ErrorHandler("User already exists", 401));
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        // else create a new user
        user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        sendCookie(user, res, "User Registered successfully", 201);
    } catch (error) {
        next(error);
    }
};


// ************ 4. Login a registered user ************
export const userLogin = async (req, res,next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        // if user doesn't exists, return error and tell him to register first
        if (!user) {
            return next(new ErrorHandler("User doesn't exist. Please register first", 400));
        }

        const isMatched = await bcrypt.compare(password, user.password);

        // if the email entered is correct but the password doesn't match, return error of Invalid Password
        if (!isMatched) {
            return next(new ErrorHandler("Invalid Password", 400));
        }

        sendCookie(user, res, `Welcome back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }

};



// ************ 4. Get my profile ************
export const getMyProfile =  (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user
    });

};


// ************ 5. Logout a user ************
export const userLogout = (req, res) => {
    res.status(200).cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message: "Logged out successfully"
    }); 
};