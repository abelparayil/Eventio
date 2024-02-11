import axios from "axios";

export const useAdminActions = () => {
  const URL = "http://localhost:9000";
  const login = async (email, password) => {
    const data = await axios.post(URL + "/admin/login", {
      email,
      password,
    });
    return data;
  };
  const createEvent = async (formdata) => {
    const data = await axios.post(URL + "/admin/create-event", {
      formdata,
    });
    return data;
  };
  return { login, createEvent };
};
