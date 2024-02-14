import { Link } from "react-router-dom";
import AdminEventCard from "./AdminEventCard";
import Button from "../common/Button";

const Events = () => {
  return (
    <div className="w-full pt-4 overflow-auto">
      <h1 className="text-xl sm:text-3xl text-center pb-5 font-bold">
        Welcome Administrator
      </h1>
      <div className="grid grid-cols-12 gap-3  sm:gap-5  pr-5 ">
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
      <div className="flex justify-center my-3">
        <Link to={"/admin/dashboard/create-event"}>
          <Button
            name={"Add Event"}
            styleclass={"bg-bluePurple rounded px-11 text-white"}
          />
        </Link>
      </div>
    </div>
  );
};

export default Events;
