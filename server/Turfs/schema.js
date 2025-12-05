import mongoose from "mongoose";
const turfSchema = new mongoose.Schema({
   _id: String,
   name: String,
   image: String,
   images: String,
   distance: Number,
   rating: Number,
   pricePerHour: Number,
   address: String,
   isFavorite: Boolean,
   description: String,
   amenities: String,
   openTime: String,
   closeTime: String
 },
 { collection: "turfs" });
export default turfSchema;
