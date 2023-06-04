import {app} from "./app.js";
import {connectdb} from "./data/database.js";

// connecting to the database
connectdb();


app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`)
}); 