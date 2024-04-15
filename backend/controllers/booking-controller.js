import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

export const addBooking = async (req, res, next) => {
  try {
    const userId = req.userId.id;
    const eventId = req.params.eventId;
    const booking = new Booking({
      user: userId,
      event: eventId,
    });

    const savedBooking = await booking.save();

    await User.findByIdAndUpdate(userId, {
      $push: { bookedEvents: savedBooking._id },
    });

    await Event.findByIdAndUpdate(eventId, {
      $push: { bookings: savedBooking._id },
    });

    res
      .status(201)
      .json({ message: "Booking successful", booking: savedBooking });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookingId = async (req, res, next) => {
  try {
    const userId = req.userId.id;
    const eventId = req.params.eventId;

    const booking = await Booking.findOne({
      user: userId,
      event: eventId,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const userId = req.userId.id;
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { bookedEvents: bookingId },
    });

    await Event.findByIdAndUpdate(booking.event, {
      $pull: { bookings: bookingId },
    });

    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
