import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import eventRouter from "./routes/event-routes.js";
import bookingRouter from "./routes/booking-routes.js";
import adminRouter from "./routes/admin-routes.js";
import paymentRouter from "./routes/payment-routes.js";
import messageRouter from "./routes/message-routes.js";
import multer from "multer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/bookings", bookingRouter);
app.use("/admin", adminRouter);
app.use("/payments", paymentRouter);
app.use("/message", messageRouter);

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File size too large" });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ message: "Only 1 file allowed" });
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ message: "Wrong file type" });
    }
  }
});

mongoose
  .connect(
    `mongodb+srv://abel:${process.env.MONGODB_PASSWORD}@cluster0.qnkv1ng.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Connected to database and server running at ${process.env.PORT}`)
    )
  )
  .catch((err) => console.log(err));
