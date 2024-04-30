import axios from "axios";
import { useRecoilState } from "recoil";
import { authAtom } from "../../store/atoms/authatom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isoToNormalDate } from "../../util/TimeConversion";

export const useUserActions = () => {
  const URL = "http://localhost:9000";
  const [auth, setAuth] = useRecoilState(authAtom);
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  const navigate = useNavigate();
  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(URL + "/user/signup", {
        name: name,
        email: email,
        password: password,
      });
      if (res.status == 201) {
        toast.success(res.data.message);
        navigate("/user/signup/verification");
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

  const resendOTP = async (email) => {
    try {
      const res = await axios.post(URL + "/user/signup/checkemail", { email });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const checkOTP = async (email, otp) => {
    try {
      const res = await axios.post(URL + "/user/verifyEmail", {
        email,
        verificationCode: otp,
      });
      toast.success(res.data.message);
      navigate("/user/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }

    return res;
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(URL + "/user/login", { email, password });
      if (res.status === 200) {
        localStorage.setItem("user", res.data.token);
        localStorage.setItem("userName", res.data.name);
        localStorage.setItem("email", res.data.email);
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

  const getAllVenues = async () => {
    try {
      const res = await axios.get(URL + "/event/distinctCategory/eventVenue");
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filteredEvents = async (filtering) => {
    try {
      if (filtering) {
        const res = await axios.post(
          URL + "/event/filterEventsUser",
          filtering
        );
        const filter = res.data.filter((event) => {
          return (event.eventDateAndTime = isoToNormalDate(
            event.eventDateAndTime
          ));
        });
        return filter;
      } else {
        const res = await axios.post(URL + "/event/filterEventsUser");
        const filter = res.data.filter((event) => {
          return (event.eventDateAndTime = isoToNormalDate(
            event.eventDateAndTime
          ));
        });
        return filter;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return {
    signup,
    login,

    resendOTP,

    checkEmail,
    getAllVenues,
    checkOTP,
    getAllTickets,
    sendMessage,
    filteredEvents,
  };
};
