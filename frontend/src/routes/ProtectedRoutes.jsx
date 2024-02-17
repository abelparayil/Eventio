import { useRecoilValue } from "recoil";
import { isAdminSelector } from "../store/selectors/isAdminSelector";
import { isUserSelector } from "../store/selectors/isUserSelector";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAdmin = useRecoilValue(isAdminSelector);
  const isUser = useRecoilValue(isUserSelector);

  if (isAdmin && !isUser) {
    return <Navigate to={"/admin/dashboard"} />;
  } else if (!isAdmin && isUser) {
    return <Navigate to={"/user/home"} />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoutes;
