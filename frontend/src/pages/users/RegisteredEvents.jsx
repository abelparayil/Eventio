import { useState } from "react";
import Modal from "../../components/common/Modal";
import Ticket from "../../components/ui/user/Ticket";
import Button from "../../components/common/Button";

const RegisteredEvents = () => {
  const USER = "VINAY DEV";
  const [selectedTicket, setSelectedTicket] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [isMessageModal, setIsMessageModal] = useState(false);
  console.log(isOpen);
  return (
    <div className="h-screen bg-mainBg overflow-auto">
      <div className="flex justify-center">
        <h1 className="text-3xl m-3">
          WELCOME <span className="text-violetBlue">{USER}</span>!
        </h1>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 my-4 justify-items-center ">
        <Ticket
          setIsMessageModal={setIsMessageModal}
          setIsOpen={setIsOpen}
          modal={false}
        />
        <Ticket setIsMessageModal={setIsMessageModal} setIsOpen={setIsOpen} />
        <Ticket setIsMessageModal={setIsMessageModal} setIsOpen={setIsOpen} />
        <Ticket setIsMessageModal={setIsMessageModal} setIsOpen={setIsOpen} />
        <Ticket setIsMessageModal={setIsMessageModal} setIsOpen={setIsOpen} />
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <Ticket
            modal={true}
            setIsMessageModal={setIsMessageModal}
            setIsOpen={setIsOpen}
          />
        </div>
      </Modal>
      <Modal isOpen={isMessageModal} onClose={() => setIsMessageModal(false)}>
        <div className=" h-full w-full flex flex-col items-center justify-center">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Reason:
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm mb-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>

          <Button
            styleclass={"bg-bluePurple rounded w-full text-white"}
            name={"Submit"}
          />
        </div>
      </Modal>
    </div>
  );
};

export default RegisteredEvents;
