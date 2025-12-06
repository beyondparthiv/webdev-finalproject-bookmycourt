// server/Turfs/schema.js
import mongoose from "mongoose";

const turfSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    image: String,
    images: [String],
    distance: Number,
    rating: Number,
    pricePerHour: Number,
    address: String,
    isFavorite: { type: Boolean, default: false },
    description: String,
    amenities: [String],
    openTime: String,
    closeTime: String,
  },
  { collection: "turfs" }
);

export default turfSchema;