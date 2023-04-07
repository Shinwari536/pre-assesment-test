import axios, { AxiosInstance } from "axios";

export const getWalletsData = async () => {
  return await axios.get("http://localhost:4000/api/get_data");
};
