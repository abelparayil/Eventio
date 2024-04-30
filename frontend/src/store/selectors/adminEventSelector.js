import { selector } from "recoil";
import axios from "axios";

const URL = "http://localhost:9000/";
export const adminEventSelector = selector({
  key: "adminEventSelector",
  get: async () => {
    const tokenbase = localStorage.getItem("user");
    const token = `Bearer ${tokenbase}`;

    try {
      const response = await axios.get(URL + "event", {
        headers: {
          Authorization: token,
        },
      });
      const filtered = response.data.filter((event) => {
        return (event.eventDateAndTime = isoToNormalDate(
          event.eventDateAndTime
        ));
      });
      return {
        events: filtered,
        loading: false,
        error: false,
      };
    } catch (error) {
      return {
        events: [],
        loading: false,
        error: true,
      };
    }
  },
});
