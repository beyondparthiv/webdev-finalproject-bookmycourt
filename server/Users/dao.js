import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function createUser(user) {
  const newUser = { ...user, _id: uuidv4() };
  return model.create(newUser);
}

export function findAllUsers() {
  return model.find();
}

export function findUserById(userId) {
  return model.findById(userId);
}

export function findUserByUsername(username) {
  return model.findOne({ username });
}

export function findUserByCredentials(username, password) {
  return model.findOne({ username, password });
}

export function updateUser(userId, userUpdates) {
  return model.updateOne({ _id: userId }, { $set: userUpdates });
}

export function deleteUser(userId) {
  return model.findByIdAndDelete(userId);
}

export function findUsersByRole(role) {
  return model.find({ role: role });
}

export function findUsersByPartialName(partialName) {
  const regex = new RegExp(partialName, "i");
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
}