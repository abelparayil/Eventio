import { useRecoilValue } from "recoil";
import { authAtom } from "../store/atoms/authAtom";
import { Navigate, Outlet } from "react-router-dom";

const UserProtectedPages = () => {
  const auth = useRecoilValue(authAtom);
  console.log(auth);
  return auth.token && !auth.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={"/user/login"} />
  );
};

export default UserProtectedPages;
