import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  eventDateAndTime: {
    type: Date,
    required: true,
    validate: {
      validator: (date) => date > Date.now(),
      message: "Event date must be in the future.",
    },
  },
  eventVenue: {
    type: String,
    required: true,
  },
  eventSpeaker: {
    type: String,
  },
  eventSpeakerPhotoUrl: {
    type: String,
  },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

export default mongoose.model("Event", eventSchema);
