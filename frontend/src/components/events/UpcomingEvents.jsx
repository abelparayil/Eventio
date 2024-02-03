import EventCard from "./EventCard";

const UpcomingEvents = () => {
  return (
    <div className="h-full">
      <div className="p-6 px-8 sp">
        <h1 className=" text-3xl ">
          Upcoming <span className=" text-bluePurple">Events</span>
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-x-8 gap-y-12 flex p-24 gap-y-6 flex-wrap justify-between ">
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
