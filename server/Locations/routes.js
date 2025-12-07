import LocationsDao from "./dao.js";

export default function LocationsRoutes(app, db) {
    const dao = LocationsDao(db);

    const createLocation = async (req, res) => {
        try {
            const newLocation = await dao.createLocation(req.body);
            res.status(201).json(newLocation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const deleteLocation = async (req, res) => {
        try {
            const { locationId } = req.params;
            await dao.deleteLocation(locationId);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const findAllLocations = async (req, res) => {
        try {
            const locations = await dao.findAllLocations();
            res.json(locations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const findLocationById = async (req, res) => {
        try {
            const { locationId } = req.params;
            const location = await dao.findLocationById(locationId);
            if (location) {
                res.json(location);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const updateLocation = (req, res) => {
        res.sendStatus(501);
    };

    app.post("/api/locations", createLocation);
    app.get("/api/locations", findAllLocations);
    app.get("/api/locations/:locationId", findLocationById);
    app.put("/api/locations/:locationId", updateLocation);
    app.delete("/api/locations/:locationId", deleteLocation);
}