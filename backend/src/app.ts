import express from "express";
import  cookieParser  from "cookie-parser";
import connectDb from "./DB/db.js";
import dotenv from 'dotenv';
import { errorMiddlerware } from "./middleware/error.js";
import userRouter from "./routes/userRoute.js";

// require("dotenv").config();
dotenv.config();
const app = express();
app.use(cookieParser());




app.use(express.json());

const db = process.env.db as string;
connectDb(db);

app.use("/api/user",userRouter);

const port = process.env.PORT || 4000;
app.use(errorMiddlerware)
app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
