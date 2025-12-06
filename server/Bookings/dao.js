import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export async function findAllBookings() {
  return model.find({}).populate("turf").populate("user");
}

export async function findBookingById(bookingId) {
  return model.findById(bookingId).populate("turf").populate("user");
}

export async function findBookingsForUser(userId) {
  return model.find({ user: userId }).populate("turf");
}

export async function findBookingsForTurf(turfId) {
  return model.find({ turf: turfId }).populate("user");
}

export async function findUsersForTurf(turfId) {
  const bookings = await model.find({ turf: turfId }).populate("user");
  return bookings.map((booking) => booking.user);
}

export async function findTurfsForUser(userId) {
  const bookings = await model.find({ user: userId }).populate("turf");
  return bookings.map((booking) => booking.turf);
}

export function createBooking(userId, turfId, bookingDate, bookingTime, duration, totalPrice) {
  return model.create({
    _id: uuidv4(),
    user: userId,
    turf: turfId,
    bookingDate,
    bookingTime,
    duration,
    totalPrice,
    status: "confirmed",
  });
}

export function updateBooking(bookingId, updates) {
  return model.updateOne({ _id: bookingId }, { $set: updates });
}

export function cancelBooking(bookingId) {
  return model.updateOne({ _id: bookingId }, { $set: { status: "cancelled" } });
}

export function deleteBooking(bookingId) {
  return model.deleteOne({ _id: bookingId });
}

export function deleteBookingForUser(userId, turfId, bookingDate, bookingTime) {
  return model.deleteOne({ user: userId, turf: turfId, bookingDate, bookingTime });
}

export function deleteAllBookingsForTurf(turfId) {
  return model.deleteMany({ turf: turfId });
}

export function deleteAllBookingsForUser(userId) {
  return model.deleteMany({ user: userId });
}

// Check if slot is available
export async function isSlotAvailable(turfId, bookingDate, bookingTime) {
  const existing = await model.findOne({
    turf: turfId,
    bookingDate,
    bookingTime,
    status: { $ne: "cancelled" },
  });
  return !existing;
}

// Get booked slots for a turf on a specific date
export async function getBookedSlots(turfId, bookingDate) {
  const bookings = await model.find({
    turf: turfId,
    bookingDate,
    status: { $ne: "cancelled" },
  });
  return bookings.map((b) => b.bookingTime);
}