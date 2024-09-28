import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_API_URL;

export const fetchUserByID = async (userID) => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/user/${userID}`, {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    });
    return data.data;
  } catch (err) {
    console.error("Error fetching user", err);
    throw err;
  }
};

export const fetchUsers = async () => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/user`, {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    });
    return data.data;
  } catch (err) {
    console.error("Error fetching user", err);
    throw err;
  }
};
