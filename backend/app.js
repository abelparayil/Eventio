import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://abel:${process.env.MONGODB_PASSWORD}@cluster0.qnkv1ng.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(
        `Connected to database and server running at ${process.env.PORT}`
      )
    )
  )
  .catch((err) => console.log(err));
