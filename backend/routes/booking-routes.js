import express from "express";
import {
  addBooking,
  deleteBooking,
  doesBookingExist,
  getAllBooking,
  getBookingId,
  useTicket,
} from "../controllers/booking-controller.js";
import { verifyUserToken } from "../middleware/user-middleware.js";
import { verifyAdminToken } from "../middleware/event-middleware.js";
import { getEventBookingsStudentDetails } from "../controllers/event-controller.js";

const bookingRouter = express.Router();

bookingRouter.get("/getAllBooking", verifyUserToken, getAllBooking);
bookingRouter.get("/getBooking/:eventId", verifyUserToken, getBookingId);

bookingRouter.post("/bookEvent/:eventId", verifyUserToken, addBooking);
bookingRouter.post("/getStudentDetails", verifyAdminToken, getEventBookingsStudentDetails);
bookingRouter.post("/ticketScan", verifyAdminToken, useTicket);
bookingRouter.post("/doesBookingExist/:eventId", verifyUserToken, doesBookingExist);

bookingRouter.delete("/cancelBooking/:id", verifyUserToken, deleteBooking);

export default bookingRouter;
