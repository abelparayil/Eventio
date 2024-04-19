import AdminEventCard from "./AdminEventCard";
import AdminAddEventCard from "./AdminAddEventCard";
import { useRecoilValue } from "recoil";
import { upcomingEventAtom } from "../../store/atoms/eventsAtom";
import { Link } from "react-router-dom";

const Events = () => {
  const events = useRecoilValue(upcomingEventAtom);
  console.log(events);
  return (
    <div className="w-full pt-4 overflow-auto">
      <h1 className="text-xl sm:text-3xl text-center pb-5 font-bold  lg:inline-block lg:w-4/5 ">
        Welcome Administrator
      </h1>
      <div className="flex justify-center mb-3 lg:inline-block lg:w-1/5 ">
        <div className="flex gap-3">
          <Link to={"/admin/dashboard/create-event"}>
            <button className="p-3  rounded-lg  bg-bluePurple">
              <p className="text-white text-sm">Add Event </p>
            </button>
          </Link>
          <button className="p-3  rounded-lg  bg-bluePurple ">
            <p className="text-white text-sm">Download</p>
          </button>
        </div>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Color
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">Silver</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">$2999</td>
              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-12 gap-3  sm:gap-5  pr-5 ">
        {events.events.map((event) => {
          console.log(event);
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
