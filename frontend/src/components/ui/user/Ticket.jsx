import QRCode from "react-qr-code";
import Button from "../../common/Button";
import { useState } from "react";
import Modal from "../../common/Modal";
import { useUserActions } from "../../../services/actions/UserActions";

const Ticket = ({ modal, refundStatus, eventId, userId }) => {
  // const qrdetails = { id: "eventid", userid: "userid" };
  if (!modal) {
    modal = false;
  }
  if (!refundStatus) {
    refundStatus = false;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isMessageModal, setIsMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const useAction = useUserActions();
  const [error, setError] = useState();
  async function sendMessage() {
    if (message) {
      await useAction.sendMessage(eventId, message);
      setIsMessageModal(false);
      setIsOpen(false);
    } else {
      setError("Please Enter Some Reason");
    }
  }

  const ticketDetails = {
    id: "ticketid",
    title: "AdVITya",
    time: "10am",
    venue: "auditorium",
    date: "22 February",
    ticketPrice: "Rs.250",
  };
  const obj = { eventId: eventId, userId: userId };
  console.log(eventId);
  return (
    <div>
      <div
        className={`border-4 border-bluePurple w-max p-5 lg:p-8 rounded-md bg-white  ${!refundStatus && !isOpen ? `transition duration-300 hover:scale-105` : `relative`}`}
      >
        <div
          onClick={() => {
            !refundStatus ? setIsOpen(true) : null;
          }}
          className={`${refundStatus ? `blur ` : null}`}
        >
          <h1 className=" text-2xl text-center text-bluePurple">AdVITya</h1>
          <div className="text-center p-3">
            <h2>Date:{ticketDetails.date}</h2>
            <h2>Time:{ticketDetails.time}</h2>
            <h2>Venue:{ticketDetails.venue}</h2>
            <h2>Ticket:{ticketDetails.ticketPrice}</h2>
          </div>
          <div className=" p-10">
            <QRCode size={!modal ? 150 : 256} value={JSON.stringify(obj)} />
          </div>
        </div>
        {refundStatus ? (
          <div className=" absolute z-10 text-magentaRed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-3xl">
            Requested
          </div>
        ) : null}
        {isOpen ? (
          <div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <div>
                <div
                  onClick={() => {
                    !refundStatus ? setIsOpen(true) : null;
                  }}
                  className={`${refundStatus ? `blur ` : null}`}
                >
                  <h1 className=" text-2xl text-center text-bluePurple">
                    AdVITya
                  </h1>
                  <div className="text-center p-3">
                    <h2>Date:{ticketDetails.date}</h2>
                    <h2>Time:{ticketDetails.time}</h2>
                    <h2>Venue:{ticketDetails.venue}</h2>
                    <h2>Ticket:{ticketDetails.ticketPrice}</h2>
                  </div>
                  <div className=" p-10">
                    <QRCode
                      size={!modal ? 256 : 256}
                      value={JSON.stringify(obj)}
                    />
                  </div>
                  <Button
                    styleclass={"bg-bluePurple rounded w-full text-white"}
                    name={"Unregister"}
                    onClick={() => {
                      setIsOpen(false);
                      setIsMessageModal(true);
                    }}
                  />
                </div>
              </div>
            </Modal>
          </div>
        ) : null}
      </div>

      <Modal isOpen={isMessageModal} onClose={() => setIsMessageModal(false)}>
        <div className=" h-full w-full flex flex-col items-center justify-center">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Reason:
          </label>
          {error ? <span className=" text-magentaRed">{error}</span> : null}
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm mb-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            onChange={(e) => {
              setMessage(e.target.value);
              setError("");
            }}
          ></textarea>

          <Button
            styleclass={"bg-bluePurple rounded w-full text-white"}
            name={"Submit"}
            onClick={sendMessage}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Ticket;
