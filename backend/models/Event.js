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
  eventVenue: {
    type: String,
    required: true,
  },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

export default mongoose.model("Event", eventSchema);
