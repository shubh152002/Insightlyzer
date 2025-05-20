import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import uploadRouters from "./routes/upload.route.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

//apis
app.use('/api/auth', userRoute);
app.use('/api/upload',uploadRouters)


app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Insightlyzer server running on port ${PORT}`);
});
