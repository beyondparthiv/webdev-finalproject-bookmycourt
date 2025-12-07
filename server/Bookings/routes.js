import * as bookingDao from "./dao.js";

export default function BookingRoutes(app) {
  // Get all bookings (admin)
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await bookingDao.findAllBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }

  // Get booking by ID
  app.get("/api/bookings/:bookingId", async (req, res) => {
    try {
      const booking = await bookingDao.findBookingById(req.params.bookingId);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      console.error("Error fetching booking:", error);
      res.status(500).json({ error: "Failed to fetch booking" });
    }

      if (userId === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          return res.status(401).json({ error: "Not authenticated" });
        }
        userId = currentUser._id;
      }

      const bookings = await bookingDao.findBookingsForUser(userId);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  // Get bookings for a turf
  app.get("/api/turfs/:turfId/bookings", async (req, res) => {
    try {
      const bookings = await bookingDao.findBookingsForTurf(req.params.turfId);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching turf bookings:", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  // Get booked slots for a turf on a date
  app.get("/api/turfs/:turfId/booked-slots", async (req, res) => {
    try {
      const { turfId } = req.params;
      const { date } = req.query;

      if (!date) {
        return res.status(400).json({ error: "Date is required" });
      }

      const bookedSlots = await bookingDao.getBookedSlots(turfId, date);
      res.json(bookedSlots);
    } catch (error) {
      console.error("Error fetching booked slots:", error);
      res.status(500).json({ error: "Failed to fetch booked slots" });
    }
  });

  // Create booking
  app.post("/api/turfs/:turfId/bookings", async (req, res) => {
    try {
      const { turfId } = req.params;
      const { userId, bookingDate, bookingTime, duration, totalPrice } = req.body;

      // Check authentication
      const currentUser = req.session["currentUser"];
      const bookingUserId = userId || currentUser?._id;

      if (!bookingUserId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      // Check slot availability
      const isAvailable = await bookingDao.isSlotAvailable(turfId, bookingDate, bookingTime);
      if (!isAvailable) {
        return res.status(409).json({ error: "Slot is already booked" });
      }

      const booking = await bookingDao.createBooking(
        bookingUserId,
        turfId,
        bookingDate,
        bookingTime,
        duration || 1,
        totalPrice
      );

      res.status(201).json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  // Cancel booking
  app.put("/api/bookings/:bookingId/cancel", async (req, res) => {
    try {
      const result = await bookingDao.cancelBooking(req.params.bookingId);
      res.json(result);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      res.status(500).json({ error: "Failed to cancel booking" });
    }
  });

  // Delete booking
  app.delete("/api/bookings/:bookingId", async (req, res) => {
    try {
      const result = await bookingDao.deleteBooking(req.params.bookingId);
      res.json(result);
    } catch (error) {
      console.error("Error deleting booking:", error);
      res.status(500).json({ error: "Failed to delete booking" });
    }
  });
}