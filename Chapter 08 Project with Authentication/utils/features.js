import jwt from "jsonwebtoken";

export const sendCookie = (user,res,message,statusCode=200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // sending the response as well as saving the cookie to the browser and logging the user in 
    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message: message,
    });
}