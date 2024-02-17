import { selector } from "recoil";
import { authAtom } from "../atoms/authatom";
import axios from "axios";

const URL = "http://localhost:9000/";
export const isUserSelector = selector({
  key: "isUserSelector",
  get: async ({ get }) => {
    try {
      const token = get(authAtom).token;
      const res = await axios.get(URL + "user/isUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200 && res.data.isUser) {
        return res.data.isUser;
      } else {
        return false;
      }
    } catch (error) {
      return null;
    }
  },
});
