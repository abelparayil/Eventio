import { useParams } from "react-router-dom";
import TestImage from "../../assets/images/Advitya.png";
import Button from "../../components/common/Button";
const EventDetails = () => {
  //user,image,title
  const user = "VINAY DEV";
  const title = "Advitya";
  const date = "22 February";
  const time = "10 am";
  const venue = "Auditorium";
  const ticketPrice = "200Rs";
  const description =
    "Experience the electrifying fusion of technology, culture, and sports at Advitya, VIT Bhopal's flagship annual fest. Get ready for a rollercoaster of innovation and entertainment as Advitya unveils a spectrum of events that ignite creativity, showcase talent, and celebrate the spirit of VIT. Join us in this vibrant extravaganza where every moment is a crescendo of excitement, making Advitya the heartbeat of our campus culture. Let the festivities begin as we redefine the essence of an unforgettable college experience – this is not just an event, it's an Advitya!";
  const { id } = useParams();

  return (
    <div className="h-screen overflow-auto">
      <h1 className="text-2xl text-center">
        WELCOME <span className="text-bluePurple">{user}</span>!
      </h1>
      <div className=" p-5 w-full h-1/2 relative">
        <img src={TestImage} alt="" className="h-full w-full " />
        <h2 className=" absolute top-1/2 text-white left-1/4 text-3xl">
          Your vision, our expertise – the perfect blend for unforgettable
          moments!
        </h2>
      </div>
      <div className="">
        <h1 className="text-center text-2xl text-bluePurple">{title}</h1>
        <div className="flex justify-center">
          <div className="w-3/4 rounded-3xl border-2 flex justify-center ">
            <div className=" p-10 text-xl tracking-wider">
              <h1>
                Date: <span className="text-magentaRed">{date}</span>
              </h1>
              <h1>
                Time: <span className="text-magentaRed">{time}</span>
              </h1>
              <h1>
                Venue: <span className="text-magentaRed">{venue}</span>
              </h1>
              <h1>
                TicketPrice:{" "}
                <span className="text-magentaRed">{ticketPrice}</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="px-14 py-0 text-xl">
          <p className="text-center p-10">
            Experience the electrifying fusion of technology, culture, and
            sports at Advitya, VIT Bhopal's flagship annual fest. Get ready for
            a rollercoaster of innovation and entertainment as Advitya unveils a
            spectrum of events that ignite creativity, showcase talent, and
            celebrate the spirit of VIT. Join us in this vibrant extravaganza
            where every moment is a crescendo of excitement, making Advitya the
            heartbeat of our campus culture. Let the festivities begin as we
            redefine the essence of an unforgettable college experience – this
            is not just an event, it's an Advitya!
          </p>
        </div>
        <div className="flex justify-center py-7 ">
          <Button
            name={"Register Now"}
            styleclass={"bg-bluePurple rounded text-white px-24"}
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
