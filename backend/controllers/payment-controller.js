import Razorpay from "razorpay";
import Payments from "../models/Payments.js";
import { createHmac } from "node:crypto";
import Event from "../models/Event.js";

export const createPayment = async (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_SECRET,
    key_secret: process.env.RAZORPAY_KEY_ID,
  });

  const eventId = req.body.id;

  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const options = {
    amount: event.ticketPrice * 100,
    currency: "INR",
  };

  try {
    const response = await instance.orders.create(options);
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Not able to create order. Please try again!");
  }
};

export const capturePayment = async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    const hash = createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${orderCreationId}|${razorpayPaymentId}`)
      .digest("hex");

    if (hash !== razorpaySignature) {
      return res.status(400).json({ message: "Transaction not legit!" });
    }

    const newPayment = new Payments({
      razorpayDetails: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
      success: true,
    });

    await newPayment.save();

    res.status(200).json({
      message: "Payment successful",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (err) {
    res.status(500).json({ message: "Some error occurred" });
  }
};
