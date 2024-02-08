import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../store/atoms/authAtom";
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
    const data = await axios.post(URL + "/user/login", { email, password });
    if (data.status === 200) {
      setAuth({ isAdmin: false, isLogin: true, token: data.token });
    }
    return data;
  };

  return { signup, login, checkEmail, checkOTP };
};
