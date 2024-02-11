import mongoose from "mongoose";

const schema = mongoose.Schema;

const adminSchema = new schema({
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
});

export default mongoose.model("Admin", adminSchema);
