import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function findAllTurfs() {
  return model.find();
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
