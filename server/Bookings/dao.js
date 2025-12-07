import model from "./model.js";
export default function BookingsDao(db) {

  async function findAllBookings() {
    return await model.find({}).populate("turf").populate("user");
  }

  async function findTurfsForUser(userId) {
    const bookings = await model.find({ user: userId }).populate("turf");
    return bookings.map((booking) => booking.turf);
  }

  async function findUsersForTurf(turfId) {
    const bookings = await model.find(
      { course: courseId }).populate("user");
    return bookings.map(
      (booking) => booking.user);
  }

  function bookTurf(userId, turfId, bookingTime, bookingDate) {
    console.log("Booking turf:", turfId, "for user:", userId, "at time:", bookingTime);
    return model.create({
      user: userId,
      turf: turfId,
      bookingTime: bookingTime,
      bookingDate: bookingDate,
      _id: `${userId}-${turfId}-${bookingTime}-${bookingDate}`,
    });
  }

  function deleteBookingForUser(user, turf, bookingTime) {
    return model.deleteOne({ user, turf, bookingTime });
  }

  function deleteAllBookingsForTurf(turfId) {
    return model.deleteMany({ turf: turfId });
  }

  function fetchBookings(userId) {
    return model.find({ user: userId });
  }

  return {
    findAllBookings,
    findTurfsForUser,
    findUsersForTurf,
    bookTurf,
    deleteBookingForUser,
    deleteAllBookingsForTurf,
    fetchBookings
  };
}

