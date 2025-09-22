import express from "express";
import connectDB from "./src/config/Db.js";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./src/middlewares/errorHandlers.js";
import authrouter from './src/routes/authRoute.js';

dotenv.config();



const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authrouter);



app.use(errorHandler);
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})

