import Razorpay from "razorpay";
import Payments from "../models/Payments.js";
import { createHmac } from "node:crypto";
import User from "../models/User.js";
import Event from "../models/Event.js";
import Booking from "../models/Booking.js";

export const createPayment = async (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_SECRET,
    key_secret: process.env.RAZORPAY_KEY_ID,
  });

  const eventId = req.body.eventId;

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

export const capturePayment = async (req, res, next) => {
  try {
    const {
      amount,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      eventId,
    } = req.body;

    const userId = req.userId.id;

    const booking = new Booking({
      user: userId,
      event: eventId,
    });
    console.log(booking);
    const savedBooking = await booking.save();

    try {
      await User.findByIdAndUpdate(userId, {
        $push: { bookedEvents: savedBooking._id },
      });

      await Event.findByIdAndUpdate(eventId, {
        $push: { bookings: savedBooking._id },
      });
    } catch (error) {
      console.log(error);
    }

    const newPayment = new Payments({
      razorpayDetails: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
      amount: amount,
      success: true,
      userPaid: userId,
    });

    const savedPayment = await newPayment.save();

    await Booking.findByIdAndUpdate(savedBooking._id, {
      payment: savedPayment._id,
    });

    return res
      .status(200)
      .json({ message: "Payment successful and bookings added", newPayment });
  } catch (err) {
    res.status(500).json({ message: "Some error occurred" });
  }
};

export const paymentResponse = async (req, res) => {
  const payments = await Payments.find();
  if (!payments) {
    return res.status(404).json({ message: "No payments found" });
  }
  return res.status(200).json(payments);
};
