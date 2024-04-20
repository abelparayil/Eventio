import express from "express";
import {
  addBooking,
  deleteBooking,
  getAllBooking,
  getBookingId,
  useTicket,
} from "../controllers/booking-controller.js";
import { verifyUserToken } from "../middleware/user-middleware.js";
import { verifyAdminToken } from "../middleware/event-middleware.js";
import { getEventBookingsStudentDetails } from "../controllers/event-controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/bookEvent/:eventId", verifyUserToken, addBooking);
bookingRouter.delete("/cancelBooking/:id", verifyUserToken, deleteBooking);
bookingRouter.get("/getBooking/:eventId", verifyUserToken, getBookingId);
bookingRouter.get("/getAllBooking", verifyUserToken, getAllBooking);
bookingRouter.get(
  "/getStudentDetails",
  verifyAdminToken,
  getEventBookingsStudentDetails
);
bookingRouter.post("/ticketScan", verifyAdminToken, useTicket);

export default bookingRouter;
