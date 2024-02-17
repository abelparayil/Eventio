import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserSelector } from "../store/selectors/isUserSelector.js";

const UserProtectedPages = () => {
  const isUser = useRecoilValue(isUserSelector);
  // console.log(isUser);

  return isUser ? <Outlet /> : <Navigate to={"/user/login"} />;
};

export default UserProtectedPages;
