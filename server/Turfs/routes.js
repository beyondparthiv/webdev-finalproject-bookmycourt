import * as turfDao from "./dao.js";

export default function TurfRoutes(app, db) {
    const dao = TurfsDao(db);
    const bookingsDao = BookingsDao(db);

    const findAllTurfs = async (req, res) => {
        const turfs = await dao.findAllTurfs();
        res.send(turfs);

    }
  });

  // Get turf by ID
  app.get("/api/turfs/:turfId", async (req, res) => {
    try {
      const { turfId } = req.params;
      const turf = await turfDao.findTurfById(turfId);
      if (!turf) {
        return res.status(404).json({ error: "Turf not found" });
      }
      res.json(turf);
    } catch (error) {
      console.error("Error fetching turf:", error);
      res.status(500).json({ error: "Failed to fetch turf" });
    }
  });

  // Create new turf
  app.post("/api/turfs", async (req, res) => {
    try {
      const turf = await turfDao.createTurf(req.body);
      res.status(201).json(turf);
    } catch (error) {
      console.error("Error creating turf:", error);
      res.status(500).json({ error: "Failed to create turf" });
    }
  });

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






  // Delete turf
  app.delete("/api/turfs/:turfId", async (req, res) => {
    try {
      const { turfId } = req.params;
      const result = await turfDao.deleteTurf(turfId);
      res.json(result);
    } catch (error) {
      console.error("Error deleting turf:", error);
      res.status(500).json({ error: "Failed to delete turf" });
    }
  });
}