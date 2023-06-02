const mongoose = require('mongoose');
const express = require('express');

mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});


// creating the mongoose.Schema of the user 
const student = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    }
});

// creating the mongoose.model of the user
const Student = new mongoose.model('Student', student);

// creating the express app
const app = express();

const student1 = Student.create({
    name: "Deependra Parmar",
    email: "deependraparmar1@gmail.com"
});