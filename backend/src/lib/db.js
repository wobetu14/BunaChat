import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected", connect.connection.host);
    }

    catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1) // 1 means fail and 0 means success
    }
};