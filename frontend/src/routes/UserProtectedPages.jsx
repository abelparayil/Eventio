import { authAtom } from "../store/atoms/authatom.js";
import { Navigate, Outlet } from "react-router-dom";
import { isAdminSelector } from "../store/selectors/isAdminSelector";
import { useRecoilValue } from "recoil";

const UserProtectedPages = () => {
  const auth = useRecoilValue(authAtom);
  // const isAdmin = useRecoilValue(isAdminSelector);
  const isAdmin = false;

  return auth.token && !isAdmin ? <Outlet /> : <Navigate to={"/user/login"} />;
};

export default UserProtectedPages;
