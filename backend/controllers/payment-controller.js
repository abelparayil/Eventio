import Razorpay from "razorpay";
import Payments from "../models/Payments.js";
import { createHmac } from "node:crypto";
import User from "../models/User.js";
import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import RefundMessage from "../models/RefundMessage.js";

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
    const { response, eventId } = req.body;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      response;

    const userId = req.userId.id;

    const bookingExists = await Booking.findOne({
      user: userId,
      event: eventId,
    });

    const eventDetails = await Event.findById(eventId);
    const amount = eventDetails.ticketPrice;

    if (bookingExists) {
      return res.status(400).json({ message: "Booking already exists" });
    }

    const booking = new Booking({
      user: userId,
      event: eventId,
    });

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
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
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

export const refundPayment = async (req, res) => {
  const userId = req.body.id;
  const eventId = req.body.eventId;

  const booking = await Booking.findOne({ user: userId, event: eventId });

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  const payment = await Payments.findById(booking.payment);

  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_SECRET,
    key_secret: process.env.RAZORPAY_KEY_ID,
  });

  const options = {
    amount: payment.amount * 100,
    speed: "normal",
  };
  let refund = null;
  try {
    refund = await instance.payments.refund(
      payment.razorpayDetails.paymentId,
      options
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Payment not refunded" });
  }

  if (refund.status === "processed") {
    await Payments.findByIdAndUpdate(booking.payment, {
      success: false,
      cancelled: true,
    });

    await User.findByIdAndUpdate(userId, {
      $pull: { bookedEvents: booking._id },
    });

    await Event.findByIdAndUpdate(eventId, {
      $pull: { bookings: booking._id },
    });

    const refundMessage = await RefundMessage.findOne({
      payment: booking.payment,
      event: eventId,
      user: userId,
    });

    if (!refundMessage) {
      return res.status(404).json({ message: "Refund message not found" });
    }

    await RefundMessage.findOneAndDelete({
      payment: booking.payment,
      event: eventId,
      user: userId,
    });

    await Booking.findByIdAndDelete(booking._id);

    return res.status(200).json({ message: "Payment refunded" });
  } else {
    return res.status(400).json({ message: "Payment not refunded" });
  }
};

export const rejectRefund = async (req, res) => {
  const userId = req.body.userId;
  const eventId = req.body.eventId;

  const booking = await Booking.findOne({ user: userId, event: eventId });

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  const payment = await Payments.findById(booking.payment);

  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }

  await Payments.findByIdAndUpdate(booking.payment, {
    success: true,
    refund: false,
  });

  const refundMessage = await RefundMessage.findOne({
    payment: booking.payment,
    event: eventId,
    user: userId,
  });

  if (!refundMessage) {
    return res.status(404).json({ message: "Refund message not found" });
  }

  await RefundMessage.findOneAndDelete({
    payment: booking.payment,
    event: eventId,
    user: userId,
  });

  return res.status(200).json({ message: "Refund rejected" });
};

export const paymentResponse = async (req, res) => {
  const payments = await Payments.find();
  if (!payments) {
    return res.status(404).json({ message: "No payments found" });
  }
  return res.status(200).json(payments);
};
