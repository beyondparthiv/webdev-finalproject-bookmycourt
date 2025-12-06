import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    _id: String,
    turf: { type: String, ref: "TurfModel", required: true },
    user: { type: String, ref: "UserModel", required: true },
    bookingDate: { type: String, required: true },
    bookingTime: { type: String, required: true },
    duration: { type: Number, default: 1 },
    totalPrice: Number,
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "completed"],
      default: "confirmed",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "bookings" }
);

export default bookingSchema;