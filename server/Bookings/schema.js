import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
    {
        _id: String,
        turf: { type: String, ref: "TurfModel" },
        user: { type: String, ref: "UserModel" },
        bookingTime: Date
    },
    { collection: "bookings" }
);
export default bookingSchema;
