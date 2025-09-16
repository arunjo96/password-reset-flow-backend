
import mongoose from "mongoose";

const connectDB = async () => {
    const monogoDB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@arundb.rhqzvr2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=ArunDB`;
    try {
        await mongoose.connect(monogoDB_URI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.stack("MongoDB connection error:", err);
        process.exit(1);
    }
}

export default connectDB;