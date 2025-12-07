import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function createLocation(location) {
  const newLocation = { ...location, _id: uuidv4() };
  return model.create(newLocation);
}

export function findAllLocations() {
  return model.find();
}

export function findAllCourtsAtLocation(locationId) {
  return model.findById(locationId).then(location => location ? location.courts : []);
}
export function findLocationById(locationId) {
  return model.findById(locationId);
}

export function findLocationByName(name) {
  return model.findOne({ name: new RegExp(name, "i") });
}

export function findLocationsByCity(city) {
  return model.find({ city: new RegExp(city, "i") });
}

export function updateLocation(locationId, updates) {
  return model.updateOne({ _id: locationId }, { $set: updates });
}

export function deleteLocation(locationId) {
  return model.deleteOne({ _id: locationId });
}