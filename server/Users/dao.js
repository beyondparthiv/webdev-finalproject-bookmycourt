import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function UsersDao() {

    const createUser = (user) => {
        const newUser = { ...user, _id: uuidv4() };
        return model.create(newUser);
    };
    const findAllUsers = () => model.find();

    const findUserById = (userId) => model.findById(userId);

    const findUserByUsername = (username) =>
        model.findOne({ username });

    const findUserByCredentials = (username, password) =>
        model.findOne({ username, password });

    const updateUser = (userId, user) =>
        model.updateOne({ _id: userId }, { $set: user });

    const deleteUser = (userId) =>
        model.findByIdAndDelete(userId);

    const findUsersByRole = (role) =>
        model.find({ role: role });

    const findUsersByPartialName = (partialName) => {
        const regex = new RegExp(partialName, "i");
        // 'i' makes it case-insensitive
        return model.find({
            $or: [{ firstName: { $regex: regex } },
            { lastName: { $regex: regex } }],
        });
    };

    return {
        createUser, findAllUsers, findUserById,
        findUserByUsername, findUserByCredentials,
        updateUser, deleteUser, findUsersByRole,
        findUsersByPartialName
    };
}
