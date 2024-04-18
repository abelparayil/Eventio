import QRCode from "react-qr-code";
import Button from "../../common/Button";

const Ticket = ({ setIsOpen, modal, setIsMessageModal, refundStatus }) => {
  // const qrdetails = { id: "eventid", userid: "userid" };
  if (!modal) {
    modal = false;
  }
  if (!refundStatus) {
    refundStatus = false;
  }

  const ticketDetails = {
    id: "ticketid",
    title: "AdVITya",
    time: "10am",
    venue: "auditorium",
    date: "22 February",
    ticketPrice: "Rs.250",
  };
  const obj = { name: "vinay", age: 21 };

  return (
    <div
      className={
        !modal
          ? `border-4 border-bluePurple w-max p-5 lg:p-8 rounded-md bg-white  ${!refundStatus ? `transition duration-300 hover:scale-105` : `relative`}`
          : `border-4 border-bluePurple w-max p-3 lg:p-9 rounded-md bg-white`
      }
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
          <h2>Date:{ticketDetails.ticketPrice}</h2>
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
      {modal ? (
        <div>
          <Button
            styleclass={"bg-bluePurple rounded w-full text-white"}
            name={"Unregister"}
            onClick={() => {
              setIsOpen(false);
              setIsMessageModal(true);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Ticket;
