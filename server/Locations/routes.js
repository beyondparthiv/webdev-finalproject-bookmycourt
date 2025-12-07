import LocationsDao from "./dao.js";

export default function LocationsRoutes(app, db) {
    const dao = LocationsDao(db);
    const createLocation = (req, res) => { };
    const deleteLocation = (req, res) => { };
    const findAllLocations = (req, res) => { };
    const findLocationById = (req, res) => { };

    const updateLocation = (req, res) => {
        const locationId = req.params.locationId;
        const userLocations = req.body;
        dao.updateLocation(locationId, userLocations);
        const currentLocation = dao.findLocationById(locationId);
        res.json(currentLocation);
    };

    app.post("/api/locations", createLocation);
    app.get("/api/locations", findAllLocations);
    app.get("/api/locations/:locationId", findLocationById);
    app.put("/api/locations/:locationId", updateLocation);
    app.delete("/api/locations/:locationId", deleteLocation);
    
}

