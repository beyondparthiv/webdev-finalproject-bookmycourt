import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    dob: Date,
    email: String,
    phone: String,
    role: {
      type: String,
      enum: ["COURTOWNER", "CUSTOMER", "ADMIN"],
      default: "CUSTOMER",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

export default userSchema;