import mongoose from 'mongoose';


// connect to mongodb
export const connectdb = () => {
    mongoose.connect(process.env.MONGO_URI, { dbName: "backendapi" }, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log('Error connecting to MongoDB', err);
    })
};