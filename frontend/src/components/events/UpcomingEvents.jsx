import EventCard from "./EventCard";
import { useRecoilValue } from "recoil";
import { upcomingEventAtom } from "../../store/atoms/eventsAtom";

import UserFilterEvent from "./UserFilterEvent";
import { useEffect, useState } from "react";
import { useUserActions } from "../../services/actions/UserActions";

const UpcomingEvents = () => {
  const upcomingEvents = useRecoilValue(upcomingEventAtom);
  const userAction = useUserActions();
  const [events, setEvents] = useState([]);
  console.log(events);
  useEffect(() => {
    async function getData() {
      const data = await userAction.filteredEvents();
      console.log(data);
      setEvents(data);
    }
    getData();
  }, []);
  return (
    <div className="h-full">
      <div className="p-4 px-8  md:flex md:justify-between md:items-center">
        <h1 className=" text-3xl ">
          Upcoming <span className=" text-bluePurple">Events</span>
        </h1>
        <UserFilterEvent setEvents={setEvents} />
      </div>
      {events.length === 0 ? (
        <div>No Events</div>
      ) : (
        <div className=" p-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
          {events.map((event) => (
            <EventCard
              key={event._id}
              id={event._id}
              title={event.eventTitle}
              date={event.eventDateAndTime}
              venue={event.eventVenue}
              image={event.eventImages[0]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
