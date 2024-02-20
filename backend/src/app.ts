import express from "express";
import cookieParser from "cookie-parser";
import connectDb from "./DB/db.js";
import dotenv from "dotenv";
import { errorMiddlerware } from "./middleware/error.js";
import userRouter from "./routes/userRoute.js";
import lawyerRouter from "./routes/lawyerRoute.js";
import cors from "cors";
// require("dotenv").config();
dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());

app.use(express.json());

const db = process.env.db as string;
connectDb(db);

app.use("/api/user", userRouter);
app.use("/api/lawyer", lawyerRouter);

const port = process.env.PORT || 4000;
app.use(errorMiddlerware);
app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
