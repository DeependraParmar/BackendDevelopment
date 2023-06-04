// if we are login, then we are having the token in the cookie and we can get the user id from the token and then we can get the user details from the database
import {User} from '../models/user.js';
import jwt from 'jsonwebtoken';

export const isAuthenticated = async(req,res,next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Please login first"
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
}