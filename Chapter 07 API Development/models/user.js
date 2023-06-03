import mongoose from 'mongoose';

// creating the schema for the database 
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});
// creating the model for the database 
export const User = mongoose.model('User', userSchema);