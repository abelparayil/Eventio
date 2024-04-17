import express from "express";
import {
  capturePayment,
  createPayment,
  paymentResponse,
  refundPayment,
} from "../controllers/payment-controller.js";
import { verifyUserToken } from "../middleware/user-middleware.js";
import { verifyAdminToken } from "../middleware/event-middleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/pay", verifyUserToken, createPayment);
paymentRouter.post("/paymentCapture", verifyUserToken, capturePayment);
paymentRouter.post("/refund", verifyAdminToken, refundPayment);
paymentRouter.get("/paymentResponse", paymentResponse);

export default paymentRouter;
