import EventCard from "./EventCard";

const UpcomingEvents = () => {
  return (
    <div className="h-full">
      <div className="p-4 px-8 sp">
        <h1 className=" text-3xl ">
          Upcoming <span className=" text-bluePurple">Events</span>
        </h1>
      </div>
      <div className=" p-16 flex gap-4 flex-wrap justify-between ">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};

export default UpcomingEvents;
