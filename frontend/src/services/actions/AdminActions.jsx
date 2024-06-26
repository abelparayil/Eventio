import axios from "axios";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { authAtom } from "../../store/atoms/authatom";
import { isoToNormalDate } from "../../util/TimeConversion";

export const useAdminActions = () => {
  const URL = "http://localhost:9000";
  const [auth, setAuth] = useRecoilState(authAtom);
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  console.log(auth);
  const login = async (email, password) => {
    try {
      const res = await axios.post(URL + "/admin/login", {
        email,
        password,
      });
      if (res.status === 200) {
        localStorage.setItem("user", res.data.token);
        localStorage.setItem("userdata", res.data.email);
        setAuth((prev) => ({
          ...prev,
          token: res.data.token,
          email: res.data.email,
        }));
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

  const getAllEvents = async () => {
    try {
      const data = await axios.get(URL + "/event");
      const filtered = data.data.filter((event) => {
        return (event.eventDateAndTime = isoToNormalDate(
          event.eventDateAndTime
        ));
      });
      return filtered;
    } catch (error) {
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
      console.log(eventId);
      const data = await axios.post(URL + `/bookings/getStudentDetails`, {
        id: eventId,
      });
      return data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getAllMessages = async () => {
    try {
      const data = await axios.get(URL + "/message/getAllMessages");
      return data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const approveRefund = async (userId, eventId) => {
    try {
      const data = await axios.post(URL + "/payments/refund", {
        id: userId,
        eventId: eventId,
      });
      toast.success(data.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const rejectRefund = async (userId, eventId) => {
    try {
      const data = await axios.post(URL + "/payments/rejectRefund", {
        userId: userId,
        eventId: eventId,
      });
      toast.success(data.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateEventStatus = async (eventId, status) => {
    try {
      if (status == "Completed") {
        const data = await axios.post(URL + `/event/eventCompleted/${eventId}`);
        toast.success(data.data.message);
      } else if (status == "Ongoing") {
        const data = await axios.post(URL + `/event/eventOngoing/${eventId}`);
        toast.success(data.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sendQRDatas = async (eventId, userId) => {
    try {
      const data = await axios.post(URL + "/bookings/ticketScan", {
        userId: userId,
        eventId: eventId,
      });
      toast.success(data.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filteredEvents = async (filtering) => {
    try {
      if (filtering) {
        const res = await axios.post(
          URL + "/event/filterEventsAdmin",
          filtering
        );
        const filter = res.data.filter((event) => {
          return (event.eventDateAndTime = isoToNormalDate(
            event.eventDateAndTime
          ));
        });
        return filter;
      } else {
        const res = await axios.post(URL + "/event/filterEventsAdmin");
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
    login,
    createEvent,
    deleteEvent,
    getBookedDetails,
    getAllMessages,
    getAllEvents,
    approveRefund,
    rejectRefund,
    updateEventStatus,
    filteredEvents,
    sendQRDatas,
  };
};
