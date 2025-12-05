import mongoose from "mongoose";
import schema from "./schema.js";
const turfModel = mongoose.model(
    "TurfModel",
    schema
);
export default turfModel;
