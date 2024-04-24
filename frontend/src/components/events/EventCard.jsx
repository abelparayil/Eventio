import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserSelector } from "../../store/selectors/isUserSelector";
import NoImage from "../../assets/images/noimage.jpeg";
import { useEffect, useState } from "react";
import useCommonActions from "../../services/actions/CommonActions";
import AOS from "aos";
import "aos/dist/aos.css";

const URL = "http://localhost:9000";
const EventCard = ({ id, title, date, venue, image }) => {
  const [errorImage, setErrorImage] = useState(false);
  const isUser = useRecoilValue(isUserSelector);
  const userAction = useCommonActions();
  const navigate = useNavigate();
  console.log(id, title, date, venue, image);
  useEffect(() => {
    AOS.init();
    userAction
      .getImage(image.imgName)
      .then((res) => setErrorImage(res))
      .catch(() => setErrorImage(true));
  }, [image, userAction]);

  function handleOnClickEvent() {
    return isUser ? navigate(`/user/event/${id}`) : navigate("/user/login");
  }

  return (
    <div
      onClick={handleOnClickEvent}
      className=" flex flex-col items-fill bg-white px-2 border-4 border-bluePurple rounded-xl overflow-hidden hover:scale-105 transition duration-500 hover:ease-in-out"
      data-aos="fade-right"
    >
      <img
        // className="mt-3 h-24"
        src={!errorImage ? `${URL}/${image.imgName}` : NoImage}
      />
      <p className="font-sarala text-center mt-8 mb-4 text-xl ">{title}</p>
      <p className="font-sarala text-center text-bluePurple mt-2">
        {date.date}-{date.monthName}-{date.year}
      </p>
      <p className="font-sarala text-center text-bluePurple mt-2">
        {date.hours}:{date.minutes} {date.AmOrPM}
      </p>
      <p className="font-sarala text-center text-bluePurple  mb-4">
        Venue - {venue}
      </p>
    </div>
  );
};

export default EventCard;
