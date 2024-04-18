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

const paymentRouter = express.Router();

paymentRouter.post("/pay", verifyUserToken, createPayment);
paymentRouter.post("/paymentCapture", verifyUserToken, capturePayment);
paymentRouter.post("/refund", verifyAdminToken, refundPayment);
paymentRouter.post("/rejectRefund", verifyAdminToken, rejectRefund);
paymentRouter.get("/paymentResponse", paymentResponse);

export default paymentRouter;
