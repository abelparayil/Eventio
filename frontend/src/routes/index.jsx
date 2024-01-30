import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
const Routes = ({ children }) => {
  const routesForPublic = [
    {
      path: "/",
      element: <LandingPage />,
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
