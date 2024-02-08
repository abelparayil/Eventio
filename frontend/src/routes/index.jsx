import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignUp from "../pages/users/SignUp";
import AdminLogin from "../pages/admin/AdminLogin";
import UserLogin from "../pages/users/UserLogin";
import Home from "../pages/users/Home";
import UserProtectedPages from "./UserProtectedPages.jsx";
import Verifications from "../pages/users/Verifications.jsx";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/userAtom.js";
import Dashboard from "../pages/admin/Dashboard.jsx";
import Messages from "../components/ui/Messages.jsx";
import Profile from "../components/ui/Profile.jsx";
import Events from "../components/events/Events.jsx";
import CreateEvent from "../components/events/CreateEvent.jsx";

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
    {
      path: "/admin/dashboard",
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
      path: "/admin/dashboard/create-event",
      element: <CreateEvent />,
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
    // {
    //   path: "*",
    //   element: <Navigate to={"/user/login"} />,
    // },
  ]);
  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default Routes;
