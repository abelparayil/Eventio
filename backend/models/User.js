import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  verificationCode: {
    type: Number,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  bookedEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

export default mongoose.model("User", userSchema);
