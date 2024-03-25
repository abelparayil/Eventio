import { atom } from "recoil";
import { upcomingEventSelector } from "../selectors/eventSelector";

export const upcomingEventAtom = atom({
  key: "upcomingEventAtom",
  default: upcomingEventSelector || {
    loading: true,
    error: false,
    events: [],
  },
});
