import AdminEventCard from "./AdminEventCard";
import AdminAddEventCard from "./AdminAddEventCard";
import { useRecoilValue } from "recoil";
import { upcomingEventAtom } from "../../store/atoms/eventsAtom";

const Events = () => {
  const events = useRecoilValue(upcomingEventAtom);
  console.log(events);
  return (
    <div className="w-full pt-4 overflow-auto">
      <h1 className="text-xl sm:text-3xl text-center pb-5 font-bold">
        Welcome Administrator
      </h1>
      <div className="grid grid-cols-12 gap-3  sm:gap-5  pr-5 ">
        <AdminAddEventCard />
        {events.events.map((event) => {
          return (
            <AdminEventCard
              key={event._id}
              image={event.eventImages[0]}
              title={event.eventTitle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Events;
