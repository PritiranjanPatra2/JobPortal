import express from "express";
import "dotenv/config";
import cookieParser from 'cookie-parser';
import connectDb from "./config/db.js";

import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import jobRouter from "./routes/jobRoutes.js";

const allowedOrigins = ["http://localhost:5173"];

const app = express();
const port = process.env.PORT || 5173;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => {
  res.send("Server is running");
});
await connectDb();
app.use('/api/user',userRouter);
app.use('/api/admin',adminRouter);
app.use('/api/jobs',jobRouter)
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
