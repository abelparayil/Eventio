import express from "express";
import {
  addBooking,
  deleteBooking,
  getBookingId,
} from "../controllers/booking-controller.js";
import { verifyUserToken } from "../middleware/user-middleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/bookEvent/:eventId", verifyUserToken, addBooking);
bookingRouter.delete("/cancelBooking/:id", verifyUserToken, deleteBooking);
bookingRouter.get("/getBooking/:eventId", verifyUserToken, getBookingId);

export default bookingRouter;
