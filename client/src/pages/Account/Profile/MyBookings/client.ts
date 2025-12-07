import axios from "axios";
const axiosWithCredentials =
  axios.create({ withCredentials: true });

const HTTP_SERVER = "http://localhost:4000";

const TURFS_API = `${HTTP_SERVER}/api/turfs`;

export const fetchAllTurfs = async () => {
  const { data } = await axios.get(TURFS_API);
  return data;
};

export const fetchAllBookings = async (userId: string) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/users/${userId}/bookings`);
  return response.data;
} 

export const fetchAllUserBookings = async (userId: string) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/users/${userId}/bookings`);
  return response.data;
} 