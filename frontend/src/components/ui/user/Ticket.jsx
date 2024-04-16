import QRCode from "react-qr-code";
import Button from "../../common/Button";

const Ticket = ({ setIsOpen, modal, setIsMessageModal }) => {
  // const qrdetails = { id: "eventid", userid: "userid" };
  if (!modal) {
    modal = false;
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
          ? `border-4 border-bluePurple w-max p-5 lg:p-8 rounded-md bg-white transition duration-300 hover:scale-105`
          : `border-4 border-bluePurple w-max p-3 lg:p-9 rounded-md bg-white`
      }
    >
      <div onClick={() => setIsOpen(true)}>
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
