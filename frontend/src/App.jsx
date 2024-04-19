import { RecoilRoot } from "recoil";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import React from "react";
import Loader from "./components/layout/Loader";
const App = () => {
  return (
    <RecoilRoot>
      <ToastContainer />
      <React.Suspense fallback={<Loader />}>
        <Routes />
      </React.Suspense>
    </RecoilRoot>
  );
};

export default App;
