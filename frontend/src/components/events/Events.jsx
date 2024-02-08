import { Link } from "react-router-dom";

const Events = () => {
  return (
    <div>
      <h1>Events</h1>
      <Link to={"/admin/dashboard/create-event"}>Create Event</Link>
    </div>
  );
};

export default Events;
