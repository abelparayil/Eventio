import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
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
      path: "/signin",
      element: <SignIn />,
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
