import { useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import { useEffect, useState } from "react";
import NoImage from "../../assets/images/noimage.jpeg";
import { isoToNormalDate } from "../../util/TimeConversion";
import useCommonActions from "../../services/actions/CommonActions";
import { toast } from "react-toastify";

const URL = "http://localhost:9000";

const EventDetails = () => {
  const [errorImage, setErrorImage] = useState(false);
  const [eventdetails, setEventDetails] = useState({});

  const user = "VINAY DEV";
  const { id } = useParams();
  const userActions = useCommonActions();
  useEffect(() => {
    userActions
      .getEventDetails(id)
      .then((res) => {
        setEventDetails(res);

        userActions.getImage(res.eventImages.imgName).then((res) => {
          setErrorImage(res);
        });
      })
      .catch((err) => {
        toast.error(err.response.message);
      });
  }, [id]);
  const { eventTitle, eventVenue, eventDateAndTime, ticketPrice } =
    eventdetails;

  const { year, monthName, date, hours, minutes, AmOrPM } =
    isoToNormalDate(eventDateAndTime);

  if (eventdetails) {
    return (
      <div className="h-screen overflow-auto">
        <h1 className="text-2xl text-center">
          WELCOME <span className="text-bluePurple">{user}</span>!
        </h1>
        <div className=" p-5 w-full h-1/2 relative">
          <img
            src={
              !errorImage && eventdetails.eventImages
                ? `${URL}/${eventdetails.eventImages[0].imgName}`
                : NoImage
            }
            alt=""
            className="h-full w-full "
          />
          <h2 className=" absolute top-1/2 text-white left-1/4 text-3xl">
            Your vision, our expertise – the perfect blend for unforgettable
            moments!
          </h2>
        </div>
        <div className="">
          <h1 className="text-center text-2xl text-bluePurple">{eventTitle}</h1>
          <div className="flex justify-center">
            <div className="w-3/4 rounded-3xl border-2 flex justify-center ">
              <div className=" p-10 text-xl tracking-wider">
                <h1>
                  Date:{" "}
                  <span className="text-magentaRed">
                    {date}/{monthName}/{year}
                  </span>
                </h1>
                <h1>
                  Time:{" "}
                  <span className="text-magentaRed">
                    {hours}:{minutes} {AmOrPM}
                  </span>
                </h1>
                <h1>
                  Venue: <span className="text-magentaRed">{eventVenue}</span>
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
              sports at Advitya, VIT Bhopal's flagship annual fest. Get ready
              for a rollercoaster of innovation and entertainment as Advitya
              unveils a spectrum of events that ignite creativity, showcase
              talent, and celebrate the spirit of VIT. Join us in this vibrant
              extravaganza where every moment is a crescendo of excitement,
              making Advitya the heartbeat of our campus culture. Let the
              festivities begin as we redefine the essence of an unforgettable
              college experience – this is not just an event, it's an Advitya!
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
  } else {
    return <div>HEY</div>;
  }
};

export default EventDetails;
