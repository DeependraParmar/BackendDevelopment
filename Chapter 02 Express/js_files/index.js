const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 4000;

// creating the app from the express module 
const app = express();

// using the essential middlewares for data transfer and access 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// creating the routes for the app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.post('/', (req, res) => {
    res.send('Got it');
    console.log(req.body);
});

// creating an api giving data 
app.post('/api/v1/userdata' , (req, res) => {
    res.json({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
});


// listening from the app at the localhost port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

