import { create } from "domain";
import { v4 as uuidv4 } from "uuid";

export default function LocationDao(db) {
    let { locations } = db;

    const createLocation = (location) => {
        const newLocation = { ...location, _id: uuidv4() };
        locations = [...locations, newLocation];
        return newLocation;
    };
    const findAllLocations = () => locations;

    const findLocationById = (locationId) =>
        locations.find((location) => location._id === locationId);

    const findLocationByName = (name) =>
        locations.find((location) => location.name === name);

    const deleteLocation = (locationId) =>
        (locations = locations.filter((l) => l._id !== locationId));

    return {
        createLocation, findAllLocations, findLocationById,
        findLocationByName, deleteLocation
    };
}