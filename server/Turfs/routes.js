import TurfsDao from "./dao.js";
import BookingsDao from "../Bookings/dao.js";

export default function TurfRoutes(app, db) {
    const dao = TurfsDao(db);
    const bookingsDao = BookingsDao(db);

    const findAllTurfs = async (req, res) => {
        const turfs = await dao.findAllTurfs();
        res.send(turfs);
    }

    const findTurfById = async (req, res) => {
        const { turfId } = req.params;
        const turf = await dao.findTurfById(turfId);
        res.send(turf);
    }


    const findTurfsForUser = async (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const turfs = await bookingsDao.findTurfsForUser(userId);
        res.json(turfs);
    };

    const createTurf= async (req, res) => {
        const currentUser = req.session["currentUser"];
        const newCourse = await dao.createTurf(req.body);
        const booking = await bookingsDao.bookTurf(
            currentUser._id,
            newCourse._id,
            Date.now()
        );
        res.json({course : newCourse, booking: booking});
    };

    const deleteTurf = async (req, res) => {
        const { turfId } = req.params;
        await bookingsDao.deleteAllBookingsForTurf(courseId);
        const status = await dao.deleteTurf(turfId);
        res.send(status);
    }

    const updateTurf = async (req, res) => {
        const { turfId } = req.params;
        const turfUpdates = req.body;
        const status = await dao.updateTurf(
            turfId, turfUpdates);
        res.send(status);
    }

    const bookTurf = async (req, res) => {
        let { uid, tid } = req.params;
        if (uid === "current") {
            const currentUser = req.session["currentUser"];
            uid = currentUser._id;
        }
        const status = await bookingsDao
            .bookTurf(uid, tid);
        res.send(status);
    };

    const deleteBookingForUser = async (req, res) => {
        let { uid, tid } = req.params;
        if (uid === "current") {
            const currentUser = req.session["currentUser"];
            uid = currentUser._id;
        }
        const status = await bookingsDao
            .deleteBookingForUser(uid, tid);
        res.send(status);
    };

    app.get("/api/turfs", findAllTurfs);
    app.get("/api/turfs/:turfId", findTurfById);
    app.get("/api/users/:userId/turfs", findTurfsForUser);
    app.post("/api/users/current/turfs", createTurf);
    app.delete("/api/turfs/:turfId",
        deleteTurf);
    app.put("/api/turfs/:turfId",
        updateTurf);
    app.post("/api/users/:uid/turfs/:tid",
        bookTurf);
    app.delete("/api/users/:uid/turfs/:cid",
        deleteBookingForUser);






}
