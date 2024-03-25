import Ticket from "../../components/ui/user/Ticket";

const RegisteredEvents = () => {
  const USER = "VINAY DEV";
  return (
    <div className="h-screen">
      <div className="flex justify-center">
        <h1>
          WELCOME <span className="text-violetBlue">{USER}</span>!
        </h1>
      </div>
      <Ticket />
    </div>
  );
};

export default RegisteredEvents;
