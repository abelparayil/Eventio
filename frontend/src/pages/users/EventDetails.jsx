import { useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import { useEffect, useState } from "react";
import NoImage from "../../assets/images/noimage.jpeg";
import { isoToNormalDate } from "../../util/TimeConversion";
import useCommonActions from "../../services/actions/CommonActions";
import { toast } from "react-toastify";
import axios from "axios";
import { loadScript } from "../../util/razorpay";

const URL = "http://localhost:9000";

const EventDetails = () => {
  const [errorImage, setErrorImage] = useState(false);
  const [eventdetails, setEventDetails] = useState({});

  const user = "VINAY DEV";
  const { id } = useParams();
  const userActions = useCommonActions();
  async function displayRazorPay(id) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("/payment/orders", { id: id });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "<YOUR RAZORPAY KEY>", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Eventio Corp.",
      description: "Test Transaction",

      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post("/payment/success", data);

        alert(result.data.msg);
      },
      prefill: {
        name: "Eventio",
        email: "eventio@management.com",
        contact: "9999999999",
      },
      notes: {
        address: "Eventio Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    userActions
      .getEventDetails(id)
      .then((res) => {
        console.log(res);
        setEventDetails(res);
        userActions
          .getImage(res.eventImages[0].imgName)
          .then((res) => {
            setErrorImage(res);
          })
          .catch((err) => toast.error(err.response.message));
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
          <h2 className=" absolute top-1/2 text-magentaRed left-1/2 text-3xl -translate-x-1/2 -translate-y-1/2 ">
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
              sports at Advitya, VIT Bhopal&apos;s flagship annual fest. Get
              ready for a rollercoaster of innovation and entertainment as
              Advitya unveils a spectrum of events that ignite creativity,
              showcase talent, and celebrate the spirit of VIT. Join us in this
              vibrant extravaganza where every moment is a crescendo of
              excitement, making Advitya the heartbeat of our campus culture.
              Let the festivities begin as we redefine the essence of an
              unforgettable college experience – this is not just an event, it's
              an Advitya!
            </p>
          </div>
          <div className="flex justify-center py-7 ">
            <Button
              name={"Register Now"}
              onClick={() => displayRazorPay(id)}
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
