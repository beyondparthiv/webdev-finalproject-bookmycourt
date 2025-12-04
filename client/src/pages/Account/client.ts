import axios from "axios";
const axiosWithCredentials =
      axios.create({ withCredentials: true });

export const HTTP_SERVER = "http://localhost:4000";
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
                 `${USERS_API}/signin`, credentials );
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signup`, user);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(
                `${USERS_API}/profile`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(
                   `${USERS_API}/${user._id}`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(
                      `${USERS_API}/signout`);
  return response.data;
};
