import * as turfDao from "./dao.js";

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