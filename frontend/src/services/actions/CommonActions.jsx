import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../store/atoms/authatom";

const useCommonActions = () => {
  const URL = "http://localhost:9000/";

  const auth = useRecoilValue(authAtom);
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;

  async function getEventDetails(id) {
    try {
      const res = await axios.get(URL + `event/${id}`);
      return res.data;
    } catch (error) {
      return error.response;
    }
  }
  async function getImage(image) {
    try {
      const res = await axios.get(URL + `${image}`);
      if (res.status == 200) {
        return false;
      }
    } catch (error) {
      return true;
    }
  }
  return {
    getEventDetails,
    getImage,
  };
};

export default useCommonActions;
