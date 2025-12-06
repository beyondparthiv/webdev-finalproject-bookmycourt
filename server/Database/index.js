import mongoose from "mongoose";

export default function connectDB() {
  const connectionString = process.env.MONGODB_URI;

  if (!connectionString) {
    console.error("MONGODB_URI is not defined in environment variables");
    process.exit(1);
  }

  mongoose.connect(connectionString);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB Atlas");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });
}