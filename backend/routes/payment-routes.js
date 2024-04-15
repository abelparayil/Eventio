import express from "express";
import {
  capturePayment,
  createPayment,
} from "../controllers/payment-controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/pay", createPayment);
paymentRouter.post("/paymentCapture", capturePayment);

export default paymentRouter;
