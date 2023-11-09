/* eslint-disable react/no-unescaped-entities */
import backgroundImage from "../assets/bg-home.jpg";
import GoogleLogin from "react-google-login";
import signUp from "../assets/signup.jpg";
import { useState } from "react";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [signup, setSignUp] = useState(true);

  return (
    <div
      className="w-full h-screen flex items-center font-mono justify-center gap-10"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ToastContainer />
      <div className=" xl:h-4/5 sm:h-max lg:h-4/5 min-w-min m-3 flex flex-row  sm:flex-row bg-white rounded-3xl">
        <div className=" py-4  px-10 overflow-auto flex justify-center flex-col gap-4">
          <div className="font-bold xl:text-xl sm:text-sm">Eventio</div>
          <div className="font-bold xl:text-4xl sm:text-3xl xs:text-xl">
            Welcome
          </div>
          <div style={signup ? { display: "block" } : { display: "none" }}>
            <p className="xl:text-sm  sm:text-xs">
              Let's get started with your new Account
            </p>
          </div>
          <GoogleLogin className="sm:text-sm xl:text-xl" />
          <div className=" border-b-2 border-black"></div>
          {signup ? <SignUp /> : <Login />}
          <div>
            {signup ? (
              <p className="text-xs pt-1">
                Already have an account?
                <span>
                  <button
                    onClick={() => {
                      setSignUp(false);
                    }}
                    className="text-blue-700"
                  >
                    Login
                  </button>
                </span>{" "}
              </p>
            ) : (
              <p className="text-xs pt-1">
                Don't have an account?
                <button
                  onClick={() => {
                    setSignUp(true);
                  }}
                  className="text-blue-700"
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>
        </div>

        <div className="hidden lg:block">
          <img src={signUp} className="  rounded-r-3xl w-full h-full" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
