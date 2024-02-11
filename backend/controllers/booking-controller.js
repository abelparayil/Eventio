import Booking from "../models/Booking.js";
import User from "../models/User.js";

export const addBooking = async (req, res, next) => {
  try {
    const { userId } = req;
    const { eventId } = req.params;
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
    console.log("Error adding booking: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const { userId } = req;
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { bookings: bookingId },
    });

    await Event.findByIdAndUpdate(booking.event, {
      $pull: { bookings: bookingId },
    });

    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.log("Error deleting booking: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
