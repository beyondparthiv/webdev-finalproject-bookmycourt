import * as locationDao from "./dao.js";

export default function LocationRoutes(app) {
  app.get("/api/locations", async (req, res) => {
    try {
      const locations = await locationDao.findAllLocations();
      res.json(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ error: "Failed to fetch locations" });
    }
  });

  app.get("/api/locations/:locationId", async (req, res) => {
    try {
      const location = await locationDao.findLocationById(req.params.locationId);
      if (!location) {
        return res.status(404).json({ error: "Location not found" });
      }
      res.json(location);
    } catch (error) {
      console.error("Error fetching location:", error);
      res.status(500).json({ error: "Failed to fetch location" });
    }
  });

  app.get("/api/locations/city/:city", async (req, res) => {
    try {
      const locations = await locationDao.findLocationsByCity(req.params.city);
      res.json(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ error: "Failed to fetch locations" });
    }
  });

  app.post("/api/locations", async (req, res) => {
    try {
      const location = await locationDao.createLocation(req.body);
      res.status(201).json(location);
    } catch (error) {
      console.error("Error creating location:", error);
      res.status(500).json({ error: "Failed to create location" });
    }
  });

  app.put("/api/locations/:locationId", async (req, res) => {
    try {
      await locationDao.updateLocation(req.params.locationId, req.body);
      const updated = await locationDao.findLocationById(req.params.locationId);
      res.json(updated);
    } catch (error) {
      console.error("Error updating location:", error);
      res.status(500).json({ error: "Failed to update location" });
    }
  });

  app.delete("/api/locations/:locationId", async (req, res) => {
    try {
      const result = await locationDao.deleteLocation(req.params.locationId);
      res.json(result);
    } catch (error) {
      console.error("Error deleting location:", error);
      res.status(500).json({ error: "Failed to delete location" });
    }
  });
}