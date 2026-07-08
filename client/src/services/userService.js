import API from "./api";

export const getUsers = async () => {
  const response = await API.get("/users");
  return response.data;
};