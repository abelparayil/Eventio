import { atom } from "recoil";

export const authAtom = atom({
  key: "authAtom",
  default: {
    token: localStorage.getItem("user"),
  },
});
