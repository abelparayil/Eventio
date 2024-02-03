import Footer from "../ui/Footer";
import Header from "../ui/Header";

const Layout = ({ children }) => {
  return (
    <div className="relative ">
      <Header />
      <div className="h-full">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
