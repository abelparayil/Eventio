import { Link, Outlet } from "react-router-dom";

const Events = () => {
  return (
    <div>
      <h1>Events</h1>
      <Link to={"create-event"}>Create Event</Link>
    </div>
  );
};

export default Events;
