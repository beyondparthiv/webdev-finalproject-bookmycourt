console.log('BookMyCourt backend running');

import "dotenv/config";
import session from "express-session";
import express from 'express'
import db from "./Database/index.js";
import UserRoutes from "./Users/routes.js";
import TurfRoutes from "./Turfs/routes.js";
import BookingRoutes from "./Bookings/routes.js";
import LocationRoutes from "./Locations/routes.js";

// Connect to MongoDB
connectDB();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
}));
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "bookmycourt",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}
app.use(session(sessionOptions));
app.use(express.json());


// Routes
UserRoutes(app);
TurfRoutes(app);
BookingRoutes(app);
LocationRoutes(app);

app.listen(4000);