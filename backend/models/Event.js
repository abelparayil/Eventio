import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventTitle: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  eventImages: [
    {
      imgName: String,
      imgPath: String,
      imgType: String,
    },
  ],
  eventDateAndTime: {
    type: Date,
    required: true,
    validate: {
      validator: (date) => date > Date.now(),
      message: "Event date must be in the future.",
    },
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  eventVenue: {
    type: String,
    required: true,
  },
  eventCompleted: {
    type: Boolean,
    default: false,
  },
  eventOngoing: {
    type: Boolean,
    default: false,
  },
  numberOfBookings: {
    type: Number,
    default: 0,
  },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

export default mongoose.model("Event", eventSchema);
