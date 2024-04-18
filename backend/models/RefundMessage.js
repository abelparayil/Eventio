import mongoose from "mongoose";

const Schema = mongoose.Schema;

const refundMessageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
  },
});

export default mongoose.model("RefundMessage", refundMessageSchema);
