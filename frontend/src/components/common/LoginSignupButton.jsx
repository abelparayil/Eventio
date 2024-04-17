import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom } from "../../store/atoms/authatom";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { isAdminSelector } from "../../store/selectors/isAdminSelector";

const LoginSignupButton = () => {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useRecoilState(authAtom);
  const isAdmin = useRecoilValue(isAdminSelector);
  const navigate = useNavigate();
  const ref = useRef();

  function handleLogout() {
    localStorage.clear();
    setToken("");
    toast.success("Succesfully Logged Out");
    navigate("/user/login");
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);
  return (
    <div>
      {!token.token ? (
        <>
          <Button
            styleclass={"bg-mercury rounded-l-lg"}
            name={"Login"}
            onClick={() => navigate("/user/login")}
          />
          <Button
            styleclass={"bg-bluePurple rounded text-white"}
            name={"Sign Up"}
            onClick={() => navigate("/user/signup")}
          />{" "}
        </>
      ) : (
        <div ref={ref} className="relative ">
          <button
            id="dropdownDefaultButton"
            className="text-black  z- bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
            type="button"
            onClick={() => setOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className={`z-10 absolute ${
              !open ? "hidden" : null
            } bg-white divide-y divide-gray-100 rounded-lg shadow max-w-sm `}
          >
            <ul
              className="py-2 text-sm text-gray-700 "
              aria-labelledby="dropdownDefaultButton"
            >
              <li className="hover:bg-bluePurple">
                <Link
                  className="block px-4 py-2 rounded hover:bg-gray-100 "
                  to={
                    !isAdmin
                      ? "/user/dashboard/profile"
                      : "/admin/dashboard/profile"
                  }
                >
                  Profile
                </Link>
              </li>
              <li className="hover:bg-bluePurple">
                <a
                  onClick={handleLogout}
                  className="block px-4 w-max py-2 hover:bg-gray-100 "
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignupButton;
