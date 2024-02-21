import axios from "axios";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { authAtom } from "../../store/atoms/authatom";

export const useAdminActions = () => {
  const URL = "http://localhost:9000";
  const [auth, setAuth] = useRecoilState(authAtom);

  const login = async (email, password) => {
    try {
      const res = await axios.post(URL + "/admin/login", {
        email,
        password,
      });
      if (res.status === 200) {
        localStorage.setItem("user", res.data.token);
        setAuth((prev) => ({ ...prev, token: res.data.token }));
        toast.success(res.data.message);
      }
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const createEvent = async (formdata) => {
    try {
      const data = await axios.post(
        URL + "/event/addEvent",

        formdata,

        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      return data;
    } catch (error) {
      if (error.response.status === 401) {
        setAuth((prev) => ({ ...prev, token: null }));
      }
      toast.error(error.response.data.message);
    }
  };
  return { login, createEvent };
};
