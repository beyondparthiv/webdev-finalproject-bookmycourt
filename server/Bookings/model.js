import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model(
"BookingModel",
 schema
);
export default model;