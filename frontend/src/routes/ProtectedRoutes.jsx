import { useRecoilValue } from "recoil";
import { authAtom } from "../store/atoms/authatom";
import { isAdminSelector } from "../store/selectors/isAdminSelector";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const authToken = useRecoilValue(authAtom).token;
  // const isAdmin=useRecoilValue(isAdminSelector);
  //final
  //   authToken ? (
  //     isAdmin ? (
  //       <Navigate to={"/admin/dashboard"} />
  //     ) : (
  //       <Navigate to={"/user/home"} />
  //     )
  //   ) : (
  //     <Outlet />
  //   );

  //test
  return authToken ? <Navigate to={"/admin/dashboard"} /> : <Outlet />;
};

export default ProtectedRoutes;
