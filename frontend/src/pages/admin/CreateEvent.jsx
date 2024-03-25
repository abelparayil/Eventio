import { useForm } from "react-hook-form";
import Button from "../../components/common/Button";

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
    console.log(data);
    const imageRemovedData = Object.keys(data)
      .filter((key) => key != "eventImage")
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    const formdata = new FormData();
    formdata.append("image", data.eventImage[0]);
    formdata.append("formdata", JSON.stringify(imageRemovedData));

    const res = adminActions.createEvent(formdata);
    return res;
  }

  return (
    <div className="h-full bg-mainBg tracking-wider">
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
      </form>
    </div>
  );
};

export default CreateEvent;
