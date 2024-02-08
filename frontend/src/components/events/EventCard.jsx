import EventImage from "../../assets/images/Advitya.png";
const EventCard = () => {
  return (
    <div className=" flex flex-col items-fill px-2 border-4 border-bluePurple rounded-xl  transition-all ease-in-out	 duration-500 ">
      <img className="mt-3" src={EventImage} alt="" />
      <p className="font-sarala text-center mt-8 mb-4 text-sm ">
        AdVITya- The vibrant cultural and tech fest of VIT BHOPAL
      </p>
      <p className="font-sarala text-center text-bluePurple mt-2">DD/MM/YY</p>
      <p className="font-sarala text-center text-bluePurple  mb-4">
        Venue - Auditorium
      </p>
    </div>
  );
};

export default EventCard;
