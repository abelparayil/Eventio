import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../store/atoms/authatom";

export const useUserActions = () => {
  const URL = "http://localhost:9000";
  const setAuth = useSetRecoilState(authAtom);

  const signup = async (name, email, password) => {
    const data = await axios.post(URL + "/user/signup", {
      name,
      email,
      password,
    });

    //check whether the email exists or not , if its
    //not exists then
    return data;
  };
  const checkEmail = async (email) => {
    const res = await axios.post(URL + "/user/signup/checkemail", { email });
    return res;
  };

  const checkOTP = async (email, otp) => {
    const res = await axios.post(URL + "/user/signup/otp", { email, otp });
    return res;
  };

  const login = async (email, password) => {
    const res = await axios.post(URL + "/user/login", { email, password });
    // console.log(res.data);
    if (res.status === 200) {
      localStorage.setItem("user", res.data.token);
      setAuth((prev) => ({ ...prev, token: res.data.token }));
    }
    return res;
  };

  return { signup, login, checkEmail, checkOTP };
};
