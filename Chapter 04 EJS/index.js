// Here, the big question is that what is the view engine and why are we using ejs as our template engine in this project?
// The answer is that the view engine is a template engine that allows us to get data from the backend and render it in the frontend. Their are many template engines available in the market like ejs, pug, handlebars, etc. But we are using ejs because it is very easy to use and it is also very popular. 

// In order to use it, we have to create a directory or say folder which has to be named as "views" and all the files which we want to render in the frontend must be placed in this folder. 
//Similarly, if we want to serve static files in our website, then we have to place all the static files like the images, css files, etc in the "public" folder and then we have to use the express.static() method to specify the folder as static and to serve the static files.


const express = require('express');
const path = require('path');
const port = 3000;

const app = express();
app.set('view engine','ejs'); //setting the view engine to ejs
app.use(express.static(path.join(path.resolve() , "public"))) //setting the public folder as static


app.get('/', (req, res) => {
    res.render('index',{name: "Deependra Parmar"}); //rendering the index.ejs file and passing the name as a variable
});


app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});