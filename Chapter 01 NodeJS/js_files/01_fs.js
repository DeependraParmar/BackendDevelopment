const fs = require("fs");

// reads the file asynchronously in the background
const a = fs.readFileSync("./sample1.txt", "utf8");
console.log(a);


// reads the file synchronously by blocking the main thread and waiting for the file to be read completely before moving on to the next line 
const b = fs.readFile("./sample2.txt", "utf8",(err,data)=>{
    console.log(data);
});

// Similarly, we are also having writeFileSync and writeFile methods for writing the data into the file.
const data1 = "This is a message";
const data2 = "This is another message";

// they will create a new file if the file doesn't exist and if the file exists, it will overwrite the data in the file.
fs.writeFileSync("./sample3.txt", data1);
fs.writeFile("./sample4.txt", data2, (err) => {
    if (err) {
        console.log(err);
    }
});


console.log("This is a message");  