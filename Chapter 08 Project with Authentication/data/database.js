import mongoose from 'mongoose';


// connect to mongodb
export const connectdb = () => {
    mongoose.connect(process.env.MONGO_URI, { dbName: "todoapp" }, { useNewUrlParser: true, useUnifiedTopology: true }).then((c) => {
        console.log(`Connected to MongoDB: ${c.connection.host}`);
    }).catch((err) => {
        console.log('Error connecting to MongoDB', err);
    })
};