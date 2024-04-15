import mongoose from "mongoose";

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  razorpayDetails: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
  success: Boolean,
});

export default mongoose.model("Payment", paymentSchema);
