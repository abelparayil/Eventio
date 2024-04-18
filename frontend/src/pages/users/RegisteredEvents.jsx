import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import Ticket from "../../components/ui/user/Ticket";
import Button from "../../components/common/Button";
import { useUserActions } from "../../services/actions/UserActions";

const RegisteredEvents = () => {
  const USER = "VINAY DEV";
  const [eventsId, setEventsId] = useState([]);
  const [userId, setUserId] = useState("");
  const useAction = useUserActions();

  useEffect(() => {
    async function getAllTickets() {
      const res = await useAction.getAllTickets();
      console.log(res);
      setUserId(res.userId);
      setEventsId(res.eventIdsWithRefundStatus);
    }
    getAllTickets();
  }, []);
  return (
    <div className="h-screen bg-mainBg overflow-auto">
      <div className="flex justify-center">
        <h1 className="text-3xl m-3">
          WELCOME <span className="text-violetBlue">{USER}</span>!
        </h1>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 my-4 justify-items-center ">
        {eventsId.map((event) => {
          return (
            <Ticket
              refundStatus={event.refundStatus}
              eventId={event.eventId}
              userId={userId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RegisteredEvents;
