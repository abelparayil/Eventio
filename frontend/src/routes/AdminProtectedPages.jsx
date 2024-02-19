import { useRecoilValue } from "recoil";
import { authAtom } from "../store/atoms/authatom";
import { Navigate, Outlet } from "react-router-dom";
import { isAdminSelector } from "../store/selectors/isAdminSelector";

const AdminProtectedPages = () => {
  const auth = useRecoilValue(authAtom);
  const isAdmin = useRecoilValue(isAdminSelector);
  console.log(isAdmin);
  // console.log(isAdmin);
  return auth.token && isAdmin ? <Outlet /> : <Navigate to={"/admin/login"} />;
};

export default AdminProtectedPages;
