import axios from "axios";

const URL = "https://localhost:5000";

const signup = (username, email, password) => {
  return axios
    .post(URL + "/signup", {
      username,
      email,
      password,
    })
    .then((response) => response.status);
};

const login = (email, password) => {
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
  signup,
  login,
};

export default Auth;
