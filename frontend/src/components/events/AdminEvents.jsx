import AdminEventCard from "./AdminEventCard";
import AdminAddEventCard from "./AdminAddEventCard";

const Events = () => {
  return (
    <div className="w-full pt-4 overflow-auto">
      <h1 className="text-xl sm:text-3xl text-center pb-5 font-bold">
        Welcome Administrator
      </h1>
      <div className="grid grid-cols-12 gap-3  sm:gap-5  pr-5 ">
        <AdminAddEventCard />
        <AdminEventCard />
        <AdminEventCard />
        <AdminEventCard />
        <AdminEventCard />
        <AdminEventCard />
        <AdminEventCard />
        <AdminEventCard />
        <AdminEventCard />
        <AdminEventCard />
        <AdminEventCard />
        <AdminEventCard />
        <AdminEventCard />
        <AdminEventCard />
        <AdminEventCard />
        <AdminEventCard />
      </div>
    </div>
  );
};

export default Events;
