import { selector } from "recoil";
import axios from "axios";
import { isoToNormalDate } from "../../util/TimeConversion";

const URL = "http://localhost:9000/";
export const upcomingEventSelector = selector({
  key: "upcomingEventSelector",
  get: async () => {
    try {
      const response = await axios.get(URL + "event");
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
