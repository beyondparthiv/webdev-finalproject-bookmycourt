import BookingsDao from './dao.js';

export default function BookingRoutes(app, db) {
    const dao = BookingsDao(db);

    const bookTurf = (req, res) => {
        const { turfId } = req.params;
        const { userId } = req.body;
        const newBooking = dao.bookTurf(userId, turfId);
        res.send(newBooking);
    }

    const deleteBookingForUser = (req, res) => {
        const { turfId, userId } = req.params;
        const status = dao.deleteBookingForUser(userId, turfId);
        res.send(status);
    }

    const fetchBookings = async (req, res) => {
        const bookings = await dao.findAllBookings();
        //console.log("Bookings fetched: ", bookings);
        res.json(bookings);
        // console.log("fetch bookings called");
        // let { userId } = req.params;
        // if (userId === "current") {
        //     const currentUser = req.session["currentUser"];
        //     if (!currentUser) {
        //         res.sendStatus(401);
        //         return;
        //     }
        //     userId = currentUser._id;
        // }
        // const bookings = await dao.findTurfsForUser(userId);
        // res.json(bookings);
    };
 
    app.post("/api/turfs/:turfId/bookings", bookTurf);
    app.delete("/api/turfs/:turfId/bookings/:userId", deleteBookingForUser);
    app.get("/api/users/:userId/bookings", fetchBookings);
}