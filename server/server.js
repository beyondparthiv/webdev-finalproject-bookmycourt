console.log('BookMyCourt backend running');

import "dotenv/config";
import session from "express-session";
import express from 'express'
import db from "./Database/index.js";
import UserRoutes from "./Users/routes.js";
import cors from "cors"
import mongoose from "mongoose";
import TurfRoutes from "./Turfs/routes.js";
import BookingRoutes from "./Bookings/routes.js";
import LocationsRoutes from "./Locations/routes.js";
const app = express();

const CONNECTION_STRING = process.env.MONGODB_URI;
mongoose.connect(CONNECTION_STRING);

app.use(cors({
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


UserRoutes(app, db);
TurfRoutes(app, db);
BookingRoutes(app, db);
LocationsRoutes(app, db);

app.listen(4000);