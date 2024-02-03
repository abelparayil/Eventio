import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignUp from "../pages/SignUp";

import AdminLogin from "../pages/AdminLogin";
import UserLogin from "../pages/UserLogin";
const Routes = ({ children }) => {
  const routesForPublic = [
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/signup",
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
  ];

  const routesForAuthenticated = [
    {
      path: "/user",
      element: "<UserProtectedPages/>",
      children: [
        {
          path: "/cart",
          element: "<CartPage/>",
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
    // ...routesForAuthenticated,
  ]);
  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default Routes;
