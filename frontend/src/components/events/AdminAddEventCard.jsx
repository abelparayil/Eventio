import { Link } from "react-router-dom";

const AdminAddEventCard = () => {
  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-4 flex justify-center ">
      <Link to={"/admin/dashboard/create-event"}>
        <button className="p-3 border-grey border-4 rounded-lg  ">
          <img className="w-56 lg:w-80" alt="" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="   stroke-bluePurple"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <p className="text-bluePurple">Add Event</p>
        </button>
      </Link>
    </div>
  );
};

export default AdminAddEventCard;
