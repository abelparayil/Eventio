import { RecoilRoot } from "recoil";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import React from "react";
const App = () => {
  return (
    <RecoilRoot>
      <ToastContainer />
      <React.Suspense fallback={"....Loading"}>
        <Routes />
      </React.Suspense>
    </RecoilRoot>
  );
};

export default App;
