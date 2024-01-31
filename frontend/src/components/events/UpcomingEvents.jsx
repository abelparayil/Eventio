import EventCard from "./EventCard";

const UpcomingEvents = () => {
  return (
    <div className="h-screen">
      <div className="p-6 px-8 sp">
        <h1 className=" text-3xl ">
          Upcoming <span className=" text-bluePurple">Events</span>
        </h1>
      </div>
      <div className="flex p-10 gap-y-6 flex-wrap justify-between ">
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
