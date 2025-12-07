import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function TurfsDao(db) {

    async function findAllTurfs() {
        return model.find({}).then(turfs => 
            turfs.map(turf => ({
                ...turf.toObject(),
                id: turf._id
            }))
        );
    }

    async function findTurfById(turfId) {
        return model.findById(turfId).then(turf => {
            if (!turf) {
                return null;
            }
            return {
                ...turf.toObject(),
                id: turf._id
            };
        });
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

    function createTurf(turf) {
        const newTurf = { ...turf, _id: uuidv4() };
        console.log("New turf: ", newTurf);
        return model.create(newTurf);
    }

    function deleteTurf(turfId) {
        return model.deleteOne({ _id: turfId });
    }

    function updateTurf(turfId, turfUpdates) {
        return model.updateOne(
            { _id: turfId },
            { $set: turfUpdates }
        )
    }

    return {
        findAllTurfs,
        findTurfById,
        findTurfsForUser,
        createTurf,
        deleteTurf,
        updateTurf
    };
}
