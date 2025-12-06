import mongoose from "mongoose";
import userSchema from "./schema.js";
const model = mongoose.model("UserModel", userSchema);

export default model;