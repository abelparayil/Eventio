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
        <EventCard id={1} />
        <EventCard id={2} />
        <EventCard id={3} />
        <EventCard id={4} />
        <EventCard id={5} />
        <EventCard id={6} />
        <EventCard id={7} />
        <EventCard id={8} />
        <EventCard id={9} />
      </div>
    </div>
  );
};

export default UpcomingEvents;
