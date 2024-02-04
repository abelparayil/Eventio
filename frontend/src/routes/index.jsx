import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignUp from "../pages/users/SignUp";
import AdminLogin from "../pages/admin/AdminLogin";
import UserLogin from "../pages/users/UserLogin";
import Home from "../pages/users/Home";
import UserProtectedPages from "./UserProtectedPages.jsx";
import Verifications from "../pages/users/Verifications.jsx";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/userAtom.js";

const Routes = ({ children }) => {
  const emailVerify = useRecoilValue(userAtom);
  const routesForPublic = [
    {
      path: "/",
      element: <LandingPage isLogin={false} />,
    },
    {
      path: "/user/signup",
      element: <SignUp />,
    },
    {
      path: "/admin/login",
      element: <AdminLogin />,
    },
    {
      path: "/user/login",
      element: <UserLogin />,
    },
    {
      path: "/user/signup/verification",
      element: <Verifications />,
    },
  ];

  const routesForAuthenticated = [
    {
      path: "/",
      element: <UserProtectedPages />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
      ],
    },
  ];

  const routesForAdmin = [
    {
      path: "/admin",
      element: "<AdminProtectedPages/>",
      children: [
        {
          path: "/event",
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    // ...routesForAdmin,
    ...routesForAuthenticated,
    {
      path: "*",
      element: <Navigate to={"/user/login"} />,
    },
  ]);
  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default Routes;
