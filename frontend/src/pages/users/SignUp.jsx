import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../services/actions/UserActions";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import signupImage from "../../assets/images/signup.png";
// import { useSetRecoilState } from "recoil";
// import { userDataAtom } from "../../store/atoms/userAtom";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(register);
  const userActions = useUserActions();
  const navigate = useNavigate();
  // const setUserData = useSetRecoilState(userDataAtom);

  async function onSubmit({ name, email, password }) {
    // const checkEmail = await userActions.checkEmail({ name, email, password });
    const resSubmit = await userActions.signup(name, email, password);
    return resSubmit;

    // if (checkEmail) {
    //   navigate("/user/login");
    // } else {
    //   setUserData({ name, email, password });
    //   navigate("/user/signup/verfication");
    // }
  }

  return (
    <div>
      <div className="flex h-screen bg-ghostWhite">
        <div className="hidden lg:flex items-center justify-center flex-1 text-black ">
          <img
            src={signupImage}
            alt="presentation"
            className=" h-full w-screen object-none blur-[2px]"
          />
          <div className="grid absolute text-center  justify-items-center  pt-52">
            <h1 className=" font-sansita text-4xl text-white font-bold italic">
              Welcome Back
            </h1>
            <h2 className="font-sansita text-4xl text-white  p-8">
              To keep connected with us provide us with your information
            </h2>
            <button
              type="submit"
              onClick={() => navigate("/user/login")}
              name={"Sign In"}
              className="w-32 bg-opacity-75 bg-mercury text-white p-2 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="w-full bg-gray-100 lg:w-7/12 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <div className="text-3xl font-semibold mb-6 text-black text-center">
              Sign Up To Eventio
            </div>
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
                  Register with Google{" "}
                </button>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>or with email</p>
            </div>
            <div className="mt-4 flex flex-col lg:flex-row items-center justify-center"></div>
            <div>
              <form
                className="flex flex-col space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    {...register("name", {
                      required: true,
                      minLength: {
                        value: 5,
                        message: "minimum character should be 5",
                      },
                    })}
                    className="mt-1 p-2 w-full rounded-md placeholder:text-sm focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                    type="text"
                    placeholder="Your Name"
                  />
                  {errors.name ? <span>{errors.name.message}</span> : null}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    {...register("email", { required: true })}
                    className="mt-1 p-2 w-full rounded-md placeholder:text-sm focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                    type="email"
                    placeholder="Enter Your Email"
                  />
                  {errors.email ? <span>{errors.email.message}</span> : null}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: true,
                      maxLength: {
                        value: 10,
                        message:
                          "Password Length should be less than 10 characters",
                      },
                      minLength: {
                        value: 5,
                        message: "Your password must have atleast 6 characters",
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

                <div>
                  <label
                    htmlFor="confirmpassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    {...register("confirmpassword", {
                      required: true,
                      validate: (val) => {
                        if (watch("password") != val) {
                          return "The password and confirmation password do not match";
                        }
                      },
                    })}
                    className="mt-1 p-2 w-full rounded-md placeholder:text-sm focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm Password"
                  />
                  <div>
                    {errors.confirmpassword ? (
                      <span>{errors.confirmpassword.message}</span>
                    ) : (
                      " "
                    )}
                  </div>
                </div>

                <button
                  className="w-full bg-bluePurple text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                  type="submit"
                >
                  Submit
                </button>
                <div>
                  <label
                    htmlFor="password"
                    className="hidden max-lg:flex justify-center  text-sm font-medium text-grey"
                  >
                    <p> Already have an account?</p>
                    <b> Sign In</b>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
