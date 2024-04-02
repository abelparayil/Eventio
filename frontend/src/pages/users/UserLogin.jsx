/* eslint-disable react/no-unescaped-entities */
import loginImage from "../../assets/images/login.png";
import { useForm } from "react-hook-form";
import { useUserActions } from "../../services/actions/UserActions";
import { useNavigate } from "react-router-dom";
const UserLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const userActions = useUserActions();
  async function handleLoginOnSubmit({ email, password }) {
    const res = await userActions.login(email, password);

    if (res.status === 200) {
      navigate("/user/home");
    }
    return res;
  }
  return (
    <div>
      <div className="flex h-screen bg-ghostWhite">
        <div className="w-full bg-gray-100 lg:w-7/12 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              Sign In to Eventio
            </h1>
            <div className="mt-4 flex flex-col lg:flex-row items-center justify-center">
              <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
                <button
                  type="button"
                  className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-4"
                    id="google"
                  >
                    <path
                      fill="#fbbb00"
                      d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
                    ></path>
                    <path
                      fill="#518ef8"
                      d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
                    ></path>
                    <path
                      fill="#28b446"
                      d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
                    ></path>
                    <path
                      fill="#f14336"
                      d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
                    ></path>
                  </svg>{" "}
                  Sign In with Google{" "}
                </button>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>or with email</p>
            </div>
            <div className="mt-4 flex flex-col lg:flex-row items-center justify-center"></div>
            <div>
              <form
                onSubmit={handleSubmit(handleLoginOnSubmit)}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="usernameoremail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email Should be Present",
                      },
                    })}
                    className="mt-1 p-2 w-full rounded-md placeholder:text-sm focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                  {errors.email ? <span>{errors.email.message}</span> : null}
                </div>
                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium "
                    >
                      Password
                    </label>
                    <label
                      htmlFor="password"
                      className="order-last block text-sm font-medium text-grey"
                    >
                      Forgot your password?
                    </label>
                  </div>

                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password Should be Present",
                      },
                      minLength: {
                        value: 5,
                        message: "Minimum Length Should be 5",
                      },
                    })}
                    className="mt-1 p-2 w-full rounded-md placeholder:text-sm focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  {errors.password ? (
                    <span>{errors.password.message}</span>
                  ) : (
                    " "
                  )}
                </div>
                <button
                  className="w-full bg-bluePurple text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                  type="submit"
                >
                  Sign In
                </button>
                <div>
                  <label
                    htmlFor="password"
                    className="hidden max-lg:flex justify-center  text-sm font-medium text-grey"
                  >
                    <p> Don't have an account?</p>
                    <b> Sign Up</b>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center flex-1 text-black ">
          <img
            src={loginImage}
            alt="presentation"
            className=" h-full w-screen object-none blur-[2px]"
          />
          <div className="grid absolute text-center  justify-items-center  pt-52">
            <h1 className=" font-sansita text-4xl text-white font-bold italic">
              Are you new here?
            </h1>
            <h2 className="font-sansita text-4xl text-white  p-8">
              To keep connected with us provide us with your information
            </h2>
            <button
              type="submit"
              className="w-32 bg-opacity-75 bg-mercury text-white p-2 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              onClick={() => navigate("/user/signup")}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
