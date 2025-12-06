import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    _id: String,
    name: { type: String, required: true },
    city: String,
    state: String,
    country: { type: String, default: "USA" },
    zipCode: String,
    latitude: Number,
    longitude: Number,
  },
  { collection: "locations" }
);

export default locationSchema;