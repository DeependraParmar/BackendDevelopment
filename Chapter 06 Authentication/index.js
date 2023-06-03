// Authentication is the process of verifying who a user is, while authorization is the process of verifying what they have access to. In this project, we will be using JWTs to authenticate users and authorize them to access certain resources.
// How to authenticate a user? In order to answer to this question, we are having various things to do with the application section of the website in the developer tools of the browser. We have localStorage, sessionStorage, cookies, etc. We will be using the cookies to store the jwt token of the user that will basically the user's id for authentication. User will stay logged in until the cookie is stored in the browser, and when the user logs out, the cookie will be deleted from the browser and the user will be logged out.

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // we need this to parse the cookies from the browser
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // this is used to create the jwt token for the user authentication
const bcrypt = require('bcrypt'); // this is used to encrypt the password of the user before storing it in the database
const port = 4000;

// connecting to the database service ?
mongoose.connect("mongodb://127.0.0.1:27017/users", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to the database successfully !");
}).catch((err) => {
    console.log("Error connecting to the database !");
    console.log(err);
});

// creating a schema for the database connectivity 
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phonenumber: Number,
    password: String
});

// creating a model for the database connectivity
const User = mongoose.model("User", userSchema);


// creating the express app here 
const app = express();


// specifying the middlewares here 
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(cookieParser());

// this is the middleware to check whether the user is logged in or not 
const isAuthenticated = async(req, res,next) => {
    const { token } = req.cookies;

    // now we know that, if token exists then, the user is logged in, else the user is logged out so accordingly,
    if (token) {
        //decoding the token to get id and searching for the user in the db
        const user = jwt.verify(token,"jklarieidknckaileuiakjcnajtuuaj");
        
        // saving the user in the req object so that we can use it in the next middleware
        req.user = await User.findById(user._id);

        next();
    }
    else {
        res.redirect('/login');
    }
}

// specifying the routes here 
app.get('/',isAuthenticated, (req, res) => {
    console.log(req.user); // we can access the req.user here easily......
    res.render('logout',{name: req.user.name});
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get("/login", (req, res) => {
    res.render('login');
});


// specifying the post routes here
app.post('/login', async(req, res) => {
    const {email,password} = req.body;
    let user = await User.findOne({email});

    if(!user){
        return res.redirect('/register');
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if(!isMatched){
        return res.render("login", {email,message: "Incorrect Password. Try once again.."});
    }

    // then, if everything goes right, we create a token, store it in the cookie and loggin the user...
    const token = jwt.sign({ _id: user._id }, "jklarieidknckaileuiakjcnajtuuaj");

    console.log(token);
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    });
    res.redirect("/");
});

app.post('/register', async(req, res) => {
    const {name,email,phonenumber,password} = req.body;

    // checking whether the user exists in the database or not
    let user = await User.findOne({email});
    if (user) {
        return res.redirect("/login");
    }
    const hashedPassword = await bcrypt.hash(password, 12); // this will encrypt the password of the user before storing it in the database
    user = await User.create({name,email,phonenumber,password: hashedPassword}); //sending the data to the database and saving it.

    // now, after saving the data of the form in the database, we will be getting unique id of the user which we can use as the token to verify it.
    // Now to deal with the fact of storing the id of the user openly. Is it correct ? No, we cannot openly store the id of the user in the browser as it can cause vulnearability. So, in order to make it more secure, we are going to use json web token (jwt) to encrypt the id of the user.....

    //Below, we are creating an encrypted token for user._id and storing it in the token variable. Secondly, we are giving a random secret key for the encryption of the token.
    const token = jwt.sign({_id: user._id},"jklarieidknckaileuiakjcnajtuuaj");

    console.log(token);
    res.cookie("token",token,{
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    });
    res.redirect('/'); // this will redirect the user to the / page and then check whether the cookie is saved or not. If saved, then the user is logged in, else the user is logged out.
});


app.get('/logout', (req, res) => {
    res.cookie("token",null,{
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.redirect('/');

});



// listening to the response on the localhost 
app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
});