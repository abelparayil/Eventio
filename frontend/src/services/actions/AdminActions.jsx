import axios from "axios";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { authAtom } from "../../store/atoms/authatom";

export const useAdminActions = () => {
  const URL = "http://localhost:9000";
  const [auth, setAuth] = useRecoilState(authAtom);
  console.log(auth);
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;

  const login = async (email, password) => {
    try {
      const res = await axios.post(URL + "/admin/login", {
        email,
        password,
      });
      if (res.status === 200) {
        localStorage.setItem("user", res.data.token);
        setAuth((prev) => ({ ...prev, token: res.data.token }));
        toast.success(res.data.message);
      }
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const createEvent = async (formdata) => {
    try {
      const data = await axios.post(URL + "/event/addEvent", formdata);
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        setAuth((prev) => ({ ...prev, token: null }));
      }
      toast.error(error.response.data.message);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const data = await axios.delete(URL + `/event/deleteEvent/${eventId}`);
      if (data.status == 200) toast.success(data.data.message);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getBookedDetails = async (eventId) => {
    try {
      const data = await axios.get(URL + `/event/bookings/${eventId}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getAllMessages = async () => {
    try {
    } catch (error) {}
  };
  return { login, createEvent, deleteEvent, getBookedDetails };
};
