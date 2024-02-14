import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignUp from "../pages/users/SignUp";
import AdminLogin from "../pages/admin/AdminLogin";
import UserLogin from "../pages/users/UserLogin";
import Home from "../pages/users/Home";
import UserProtectedPages from "./UserProtectedPages.jsx";
import Verifications from "../pages/users/Verifications.jsx";
// import { useRecoilValue } from "recoil";
// import { userAtom } from "../store/atoms/userAtom.js";
import Layout from "../components/layout/Layout.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import Messages from "../components/ui/Messages.jsx";
import Profile from "../components/ui/Profile.jsx";
import Events from "../components/events/AdminEvents.jsx";
import CreateEvent from "../pages/admin/CreateEvent.jsx";
import AdminProtectedPages from "./AdminProtectedPages.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";

const Routes = ({ children }) => {
  // const emailVerify = useRecoilValue(userAtom);
  const routesForAdmin = [
    {
      path: "/",
      element: <AdminProtectedPages />,
      children: [
        {
          path: "admin/dashboard",
          element: <Dashboard />,
          children: [
            {
              path: "messages",
              element: <Messages />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "events",
              element: <Events />,
            },
          ],
        },
        {
          path: "admin/dashboard/create-event",
          element: <CreateEvent />,
        },
      ],
    },
  ];
  const routesForAuthenticated = [
    {
      path: "/",
      element: <UserProtectedPages />,
      children: [
        {
          path: "/user/home",
          element: <Home />,
        },
      ],
    },
  ];
  const routesForLayout = [
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <LandingPage isLogin={false} />,
        },
        {
          path: "/user/signup/verification",
          element: <Verifications />,
        },
        ...routesForAdmin,
        ...routesForAuthenticated,
      ],
    },
  ];
  const routesForNonLayout = [
    {
      path: "/",
      element: <ProtectedRoutes />,
      children: [
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
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForLayout,
    ...routesForNonLayout,
    {
      path: "*",
      element: <Navigate to={"/user/login"} />,
    },
  ]);
  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default Routes;
