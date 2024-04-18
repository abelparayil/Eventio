import axios from "axios";
import { useRecoilState } from "recoil";
import { authAtom } from "../../store/atoms/authatom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useUserActions = () => {
  const URL = "http://localhost:9000";
  const [auth, setAuth] = useRecoilState(authAtom);
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  const navigate = useNavigate();
  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(URL + "/user/signup", {
        name,
        email,
        password,
      });
      if (res.status == 201) {
        toast.success(res.data.message);
        navigate("/user/login");
      }
      return res;
    } catch (error) {
      if (error.response.status === 401) {
        setAuth((prev) => ({ ...prev, token: null, name: "Unknown" }));
      }
      toast.error(error.response.data.message);
    }
    //check whether the email exists or not , if its
    //not exists then
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
    try {
      const res = await axios.post(URL + "/user/login", { email, password });
      if (res.status === 200) {
        localStorage.setItem("user", res.data.token);
        setAuth((prev) => ({
          ...prev,
          token: res.data.token,
          name: res.data.name,
        }));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const getAllTickets = async () => {
    try {
      const res = await axios.get(URL + "/bookings/getAllBooking");
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const sendMessage = async (eventId, message) => {
    try {
      const res = await axios.post(URL + "/message/addMessage", {
        eventId: eventId,
        message: message,
      });
      if (res.status == 201) {
        toast.success("Message Sent Succesfully");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return { signup, login, checkEmail, checkOTP, getAllTickets, sendMessage };
};
