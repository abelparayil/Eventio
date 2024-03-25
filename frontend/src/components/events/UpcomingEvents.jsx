import EventCard from "./EventCard";
import { useRecoilValue } from "recoil";
import { upcomingEventAtom } from "../../store/atoms/eventsAtom";

const UpcomingEvents = () => {
  const upcomingEvents = useRecoilValue(upcomingEventAtom);

  return (
    <div className="h-full">
      <div className="p-4 px-8 sp">
        <h1 className=" text-3xl ">
          Upcoming <span className=" text-bluePurple">Events</span>
        </h1>
      </div>
      <div className=" p-16 flex gap-4 flex-wrap justify-between ">
        {upcomingEvents.events.map((event) => (
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
    </div>
  );
};

export default UpcomingEvents;
