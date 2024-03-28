import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

const Layout = () => {
  return (
    <div className="relative">
      <Header />
      <div className="h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
