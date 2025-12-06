import mongoose from "mongoose";
import turfSchema from "./schema.js";

const Turf = mongoose.model("Turf", turfSchema);

export default Turf;