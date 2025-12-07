import TurfsDao from "./dao.js";
import BookingsDao from "../Bookings/dao.js";

export default function TurfRoutes(app) {
  // Get all turfs
  app.get("/api/turfs", async (req, res) => {
    try {
      const turfs = await turfDao.findAllTurfs();
      res.json(turfs);
    } catch (error) {
      console.error("Error fetching turfs:", error);
      res.status(500).json({ error: "Failed to fetch turfs" });
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

  // Update turf
  app.put("/api/turfs/:turfId", async (req, res) => {
    try {
      const { turfId } = req.params;
      const result = await turfDao.updateTurf(turfId, req.body);
      res.json(result);
    } catch (error) {
      console.error("Error updating turf:", error);
      res.status(500).json({ error: "Failed to update turf" });
    }
  });

}
