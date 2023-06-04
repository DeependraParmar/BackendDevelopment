import mongoose from 'mongoose';

// creating the schema for the database 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
// creating the model for the database 
export const User = mongoose.model('User', userSchema);