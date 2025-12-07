import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function TurfsDao(db) {

    function findAllTurfs() {
        return model.find({}).then(turfs => 
            turfs.map(turf => ({
                ...turf.toObject(),
                id: turf._id
            }))
        );
    }

    async function findTurfsForUser(userId) {
        const { bookings } = db;
        const turfs = await model.find();
        const bookedTurfs = turfs.filter((turf) =>
            bookings.some((booking) =>
                booking.user === userId &&
                booking.turf === turf._id));
        return bookedTurfs;
    }

export function findTurfById(turfId) {
  return model.findById(turfId);
}

export function createTurf(turf) {
  const newTurf = { ...turf, _id: turf._id || uuidv4() };
  return model.create(newTurf);
}

export function deleteTurf(turfId) {
  return model.deleteOne({ _id: turfId });
}

export function updateTurf(turfId, turfUpdates) {
  return model.updateOne({ _id: turfId }, { $set: turfUpdates });
}

export function findTurfsByIds(turfIds) {
  return model.find({ _id: { $in: turfIds } });
}