import mongoose from "mongoose";

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  razorpayDetails: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
  amount: Number,
  success: Boolean,
  refund: {
    type: Boolean,
    default: false,
  },
  cancelled: {
    type: Boolean,
    default: false,
  },
  userPaid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Payment", paymentSchema);
