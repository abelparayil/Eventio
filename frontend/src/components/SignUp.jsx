import { toast } from "react-toastify";
import Auth from "../services/Auth.service";
import { useState } from "react";

const SignUp = () => {
  const [userData, setUserData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const repassword = formData.get("repassword");

    setUserData({
      email: email,
      password: password,
      repassword: repassword,
    });
    if (userData.password == userData.repassword) {
      const response = await Auth.register(userData.email, userData.password);
      if (response.status == 400) {
        toast("Succesfully Created the Account");
      } else {
        toast("Check your credential");
      }
    } else {
      toast("Your Password and Confirm Password are not Matching");
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
            placeholder={"Create your password"}
          />
        </div>
        <div className="flex flex-col py-1 mb-2">
          <label htmlFor="password">Repeat Password</label>
          <input
            name="repassword"
            className="border p-2 text-xs rounded-3xl"
            placeholder="Repeat your password"
            type="password"
          />
        </div>
        <button
          type="submit"
          className="bg-black w-full text-white p-1 rounded-3xl"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUp;
