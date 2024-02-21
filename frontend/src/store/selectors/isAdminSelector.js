import { selector } from "recoil";
import { authAtom } from "../atoms/authatom";
import axios from "axios";

const URL = "http://localhost:9000/";
export const isAdminSelector = selector({
  key: "isAdminSelector",
  get: async ({ get }) => {
    try {
      const token = get(authAtom).token;
      const res = await axios.get(URL + "admin/isAdmin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status == 200 && res.data.isAdmin) {
        return res.data.isAdmin;
      } else {
        return false;
      }
    } catch (error) {
      return null;
    }
  },
});
