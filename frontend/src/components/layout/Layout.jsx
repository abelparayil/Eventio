import Footer from "../ui/Footer";
import Header from "../ui/Header";

const Layout = ({ children }) => {
  return (
    <div className="relative  font-sa">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
