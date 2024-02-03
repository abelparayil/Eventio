import axios from "axios";

export const useUserActions = () => {
  const URL = "http://localhost:5000";
  const signup = async (name, email, password) => {
    const data = await axios.post(URL + "/user/signup", {
      name,
      email,
      password,
    });
    return data;
  };

  return { signup };
};
