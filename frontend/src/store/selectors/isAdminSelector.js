import { selector } from "recoil";
import { authAtom } from "../atoms/authatom";
import axios from "axios";

export const isAdminSelector = true;
// selector({
//   key: "isAdminSelector",
//   get: async ({ get }) => {
//     const token = get(authAtom).token;
//     const isAdmin = await axios.get("/admin/isAdmin", {
//       headers: {
//         Authorization: token,
//       },
//     });
//     return isAdmin;
//   },
// });
