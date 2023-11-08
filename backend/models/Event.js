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
  eventDate: {
    type: Date,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
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
  bookings: [{ type: String }],
});

export default mongoose.model("Event", eventSchema);
