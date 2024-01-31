import EventImage from "../../assets/images/Advitya.png";
const EventCard = () => {
  return (
    <div className="px-4 pt-2 pb-9 border-2 rounded-lg">
      <img className=" h-64" src={EventImage} alt="" />
      <p>AdVITya- The vibrant cultural and tech fest of VIT BHOPAL</p>
    </div>
  );
};

export default EventCard;
