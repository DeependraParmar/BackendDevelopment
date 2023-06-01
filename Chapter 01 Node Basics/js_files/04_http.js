const http = require('http');
const port = 4000;
const hostname = `localhost`;


// http is basically used to create a basic server for our backend from where we can send and receive data from the client side with the help of different type of data requests. 

const server = http.createServer((req, res, next) => {
    if(req.url === '/') {
        res.write('<h1>Hello World</h1>');
        res.end();
    }
    else if(req.url === '/about') {
        res.write('<h1>This is about page</h1>');
        res.end();
    }
    else if(req.url === '/contact') {
        res.write('<h1>This is contact page</h1>');
        res.end();
    }
    else {
        res.write('<h1>404 Page not found</h1>');
        res.end();
    }
});

// After the server is created, it has to be listened to a port number so that it can be accessed by the client side.
server.listen(port,hostname, () => {
    console.log(`Server is working fine at http://${hostname}:${port}`);
});