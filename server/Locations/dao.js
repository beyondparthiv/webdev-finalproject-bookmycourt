import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function LocationsDao(db) {
    return {
        createLocation: (location) => {
            const newLocation = { ...location, _id: uuidv4() };
            return model.create(newLocation);
        },
        
        findAllLocations: () => {
            return model.find();
        },
        
        findAllCourtsAtLocation: (locationId) => {
            return model.findById(locationId).then(location => location ? location.courts : []);
        },
        
        findLocationById: (locationId) => {
            return model.findById(locationId);
        },
        
        findLocationByName: (name) => {
            return model.findOne({ name: new RegExp(name, "i") });
        },
        
        findLocationsByCity: (city) => {
            return model.find({ city: new RegExp(city, "i") });
        },
        
        updateLocation: (locationId, updates) => {
            return model.updateOne({ _id: locationId }, { $set: updates });
        },
        
        deleteLocation: (locationId) => {
            return model.deleteOne({ _id: locationId });
        }
    };
}