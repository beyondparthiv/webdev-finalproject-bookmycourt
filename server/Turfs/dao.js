import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function CoursesDao(db) {

    function findAllTurfs() {
        // return db.courses;
        return model.find(
            {},
            { name: 1, description: 1}
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
        findTurfsForUser,
        createTurf,
        deleteTurf,
        updateTurf
    };
}
