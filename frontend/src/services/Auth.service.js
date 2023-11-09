import axios from "axios";

const URL = "https://localhost:5000";

const register = (email, password) => {
  console.log(email, password);
  return axios
    .post(URL + "/register", {
      email,
      password,
    })
    .then((response) => response.status);
};

const login = (email, password) => {
  console.log(email, password);
  return axios
    .post(URL + "/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const Auth = {
  register,
  login,
};

export default Auth;
