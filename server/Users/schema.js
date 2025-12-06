import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    dob: {
        type: Date,
    },
    email: {
        type: String,
    },
    role: {
        type: String,
        enum: ["COURTOWNER", "CUSTOMER", "ADMIN"],
        default: "CUSTOMER",
    },

},
    { collection: "users" }
);
export default userSchema;