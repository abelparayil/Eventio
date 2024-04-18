import Booking from "../models/Booking.js";
import RefundMessage from "../models/RefundMessage.js";

export const addMessage = async (req, res) => {
  const userId = req.userId.id;
  const { eventId, message } = req.body;

  const bookingExists = await Booking.findOne({
    user: userId,
    event: eventId,
  });

  if (!bookingExists) {
    return res.status(400).json({ message: "Booking does not exist" });
  }

  const newMessage = new RefundMessage({
    message,
    user: userId,
    event: eventId,
    payment: bookingExists.payment,
  });

  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await RefundMessage.find()
      .populate("user")
      .populate("event")
      .populate("payment");

    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
