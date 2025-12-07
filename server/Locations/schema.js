import mongoose from "mongoose";
import turfSchema from "../Turfs/schema.js";
 
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
    courts: [String],
  },
  { collection: "locations" }
);
 
export default locationSchema;