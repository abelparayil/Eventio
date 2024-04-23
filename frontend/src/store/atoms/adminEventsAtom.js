import { atom } from "recoil";
import { adminEventSelector } from "../selectors/adminEventSelector";

export const adminEventsAtom = atom({
  key: "adminEventsAtom",
  default: adminEventSelector || {
    loading: true,
    error: false,
    events: [],
  },
});
