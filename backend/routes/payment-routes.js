import express from "express";
import {
  capturePayment,
  createPayment,
  paymentResponse,
} from "../controllers/payment-controller.js";
import { verifyUserToken } from "../middleware/user-middleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/pay", verifyUserToken, createPayment);
paymentRouter.post("/paymentCapture", verifyUserToken, capturePayment);
paymentRouter.get("/paymentResponse", paymentResponse);

export default paymentRouter;
