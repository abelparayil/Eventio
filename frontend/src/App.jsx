import { RecoilRoot } from "recoil";
import Routes from "./Routes";
import Layout from "./components/layout/Layout";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <RecoilRoot>
      <ToastContainer />
      <Routes />
    </RecoilRoot>
  );
};

export default App;
