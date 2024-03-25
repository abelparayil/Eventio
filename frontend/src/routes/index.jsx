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
import Layout from "../components/layout/Layout.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import UserDashboard from "../pages/users/Dashboard.jsx";
import Messages from "../components/ui/admin/Messages.jsx";
import Profile from "../components/ui/admin/Profile.jsx";
import UserProfile from "../components/ui/user/Profile.jsx";
import Events from "../components/events/AdminEvents.jsx";
import CreateEvent from "../pages/admin/CreateEvent.jsx";
import AdminProtectedPages from "./AdminProtectedPages.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import EventDetails from "../pages/users/EventDetails.jsx";
import RegisteredEvents from "../pages/users/RegisteredEvents.jsx";
import StudentList from "../pages/admin/StudentList.jsx";

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
        {
          path: "admin/event/:id/students",
          element: <StudentList />,
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
        {
          path: "/user/event/:id",
          element: <EventDetails />,
        },
        {
          path: "/user/dashboard",
          element: <UserDashboard />,
          children: [
            {
              path: "profile",
              element: <UserProfile />,
            },
          ],
        },
        {
          path: "/user/registered-events",
          element: <RegisteredEvents />,
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
          element: <LandingPage />,
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
