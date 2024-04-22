import express from "express";
import {
  capturePayment,
  createPayment,
  paymentResponse,
  refundPayment,
  rejectRefund,
} from "../controllers/payment-controller.js";
import { verifyUserToken } from "../middleware/user-middleware.js";
import { verifyAdminToken } from "../middleware/event-middleware.js";
import { doesBookingExist } from "../controllers/booking-controller.js";

const paymentRouter = express.Router();

paymentRouter.get("/paymentResponse", paymentResponse);

paymentRouter.post("/pay", verifyUserToken, createPayment);
paymentRouter.post("/paymentCapture", verifyUserToken, doesBookingExist, capturePayment);
paymentRouter.post("/refund", verifyAdminToken, refundPayment);
paymentRouter.post("/rejectRefund", verifyAdminToken, rejectRefund);

export default paymentRouter;
