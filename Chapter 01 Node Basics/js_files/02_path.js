const path = require('path');

// gives the extension of the file 
const extension = path.extname("./01_fs.js");
console.log(extension);

// returns the base folder or directory of the given path 
const basename = path.basename("C:/Users/HP/Desktop/Nodejs/Nodejs");
console.log(basename);

// returns the path of the root folder 
const dirname = path.dirname("C:/Users/HP/Desktop/Nodejs/Nodejs/01_fs.js");
console.log(dirname);

// join is used to join two or more paths together and get a new path from it 
const join = path.join("C:/Users/HP/Desktop/Nodejs/Nodejs", "01_fs.js");
console.log(join);