import mongoose from "mongoose";
import locationSchema from "./schema.js";
 
const model = mongoose.model("LocationModel", locationSchema);
 
export default model;