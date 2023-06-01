const os = require('os');

// returns the total memory of the pc or computer ?
const totalMemory = os.totalmem();
console.log(totalMemory);

// returns the free memory available in the system 
const freeMemory = os.freemem();
console.log(freeMemory);

// gives the hostname of our pc or computer ?
const hostname = os.hostname();
console.log(hostname);