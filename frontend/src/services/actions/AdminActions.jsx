import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../store/atoms/authatom";

export const useAdminActions = () => {
  const URL = "http://localhost:9000";
  const setAuth = useSetRecoilState(authAtom);
  const login = async (email, password) => {
    const res = await axios.post(URL + "/admin/login", {
      email,
      password,
    });
    if (res.status === 200) {
      localStorage.setItem("user", res.data.token);
      setAuth((prev) => ({ ...prev, token: res.data.token }));
    }
    return res;
  };
  const createEvent = async (formdata) => {
    const data = await axios.post(URL + "/event/addEvent", {
      formdata,
    });
    return data;
  };
  return { login, createEvent };
};
