import Button from "../../components/common/Button";
import LoginSignupButton from "../../components/common/LoginSignupButton";
import EventCreator from "../../components/events/EventCreator";
import EventDescription from "../../components/events/EventDescription";

const CreateEvent = () => {
  return (
    <div className="h-screen bg-mercury">
      <LoginSignupButton isLogin={true} />
      <Button
        styleclass={"bg-bluePurple rounded-full text-white"}
        name={"Go Back"}
      />
      <h1 className="text-4xl text-center rounded">CreateEvent</h1>

      <EventCreator />
      <EventDescription />
    </div>
  );
};

export default CreateEvent;
