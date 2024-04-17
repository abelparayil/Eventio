import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import eventRouter from "./routes/event-routes.js";
import bookingRouter from "./routes/booking-routes.js";
import adminRouter from "./routes/admin-routes.js";
import paymentRouter from "./routes/payment-routes.js";

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
