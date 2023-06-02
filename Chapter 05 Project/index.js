// In this project, we are going to create a contact form and send the data to the server using NodeJS. By sending the data, we mean showing or printing the data to the console at present.

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000;


// connecting the local database to the server
mongoose.connect("mongodb://127.0.0.1:27017/contactForm", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("Error connecting to the database");
    console.log(err);
});


const app = express();

// creating a schema for the database
const Users = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});


// creating a model for the database
const User = mongoose.model("User", Users);


// using the middlewares for better performance of the app and setting the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(path.join(path.resolve(), "public")));
app.use(bodyParser.urlencoded({ extended: true }));


// establishing the routes here and rendering the pages
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/success", (req, res) => {
    res.render("success");
});

app.post("/", (req, res) => {
    res.send("<h1>Thank you for submitting the form</h1>");
});
app.post("/success", async(req, res) => {
    const user = await User.create(req.body); // creating document and saving it to the database
    res.render("success");
});



// listening the server at the localhost 
app.listen(port, () => {
    console.log(`Server is running at port http://localhost:${port}`);
})