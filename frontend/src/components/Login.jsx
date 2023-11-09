import { useState } from "react";
import Auth from "../services/Auth.service";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
  const [userData, setUserData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    setUserData({
      email: email,
      password: password,
    });

    const response = await Auth.login(userData.email, userData.password);
    if (response.status == 400) {
      toast("Succesful");
    } else {
      toast("Check your credential");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            className="border p-2 rounded-3xl text-xs"
            type="email"
            placeholder="Enter you email"
          />
        </div>
        <div className="flex flex-col py-1 ">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            className="border p-2 text-xs rounded-3xl"
            type="password"
            placeholder={"Enter your Password"}
          />
        </div>

        <button
          type="submit"
          className="bg-black w-full text-white p-1 rounded-3xl"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
