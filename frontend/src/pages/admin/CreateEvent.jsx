import { useForm } from "react-hook-form";
import Button from "../../components/common/Button";
import LoginSignupButton from "../../components/common/LoginSignupButton";
import EventCreator from "../../components/events/EventCreator";
import EventDescription from "../../components/events/EventDescription";
import { useAdminActions } from "../../services/actions/AdminActions";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const adminActions = useAdminActions();
  const navigate = useNavigate();
  function handleCreateEventSubmit(data) {
    const res = adminActions.createEvent(data);
    return res;
  }

  return (
    <div className="h-full bg-mainBg tracking-wider">
      <LoginSignupButton isLogin={true} />
      <Button
        styleclass={"bg-bluePurple rounded-full text-white m-4"}
        name={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        }
        onClick={() => navigate("/admin/dashboard/")}
      />
      <h1 className="text-4xl text-center rounded">CreateEvent</h1>
      <form
        className="h-screen overflow-auto"
        onSubmit={handleSubmit(handleCreateEventSubmit)}
      >
        <EventCreator register={register} errors={errors} />
        <EventDescription register={register} errors={errors} />
        {/* <div className="grid grid-cols-1   md:grid-cols-3 lg:grid-cols-5 gap-1 ">
          <div className="flex items-center ps-4 bg-white  rounded text-sm ">
            <input
              {...register("radio")}
              type="radio"
              id="celebratory-club"
              value="celebratory-club"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
            />
            <label
              htmlFor="celebratory-club"
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 "
            >
              Celebratory Club
            </label>
          </div>
          <div className="flex items-center ps-4 bg-white  rounded ">
            <input
              {...register("radio")}
              type="radio"
              id="technical-club"
              value="technical-club"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
            />
            <label
              htmlFor="technical-club"
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 "
            >
              Technical Club
            </label>
          </div>
          <div className="flex items-center ps-4 bg-white  rounded ">
            <input
              {...register("radio")}
              id="artmusic-club"
              type="radio"
              value="artmusic-club"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
            />
            <label
              htmlFor="artmusic-club"
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 "
            >
              Art & Music Club
            </label>
          </div>
          <div className="flex items-center ps-4 bg-white  rounded ">
            <input
              {...register("radio")}
              id="sports-club"
              type="radio"
              value="sports-club"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
            />
            <label
              htmlFor="sports-club"
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 "
            >
              Sports Club
            </label>
          </div>
          <div className="flex items-center ps-4 bg-white  rounded ">
            <input
              {...register("radio")}
              id="dance-club"
              type="radio"
              value="dance-club"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
            />
            <label
              htmlFor="dance-club"
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 "
            >
              Dance Club
            </label>
          </div>
        </div> */}
      </form>
    </div>
  );
};

export default CreateEvent;
