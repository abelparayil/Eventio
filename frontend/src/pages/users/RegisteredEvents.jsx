import { useState } from "react";
import Modal from "../../components/common/Modal";
import Ticket from "../../components/ui/user/Ticket";

const RegisteredEvents = () => {
  const USER = "VINAY DEV";
  const [selectedTicket, setSelectedTicket] = useState();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-screen bg-mainBg overflow-auto">
      <div className="flex justify-center">
        <h1 className="text-3xl m-3">
          WELCOME <span className="text-violetBlue">{USER}</span>!
        </h1>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 my-4 justify-items-center ">
        <Ticket setIsOpen={setIsOpen} modal={false} />
        <Ticket setIsOpen={setIsOpen} modal={false} />
        <Ticket setIsOpen={setIsOpen} modal={false} />
        <Ticket setIsOpen={setIsOpen} modal={false} />
        <Ticket setIsOpen={setIsOpen} modal={false} />
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <Ticket modal={true} />
        </div>
      </Modal>
    </div>
  );
};

export default RegisteredEvents;
