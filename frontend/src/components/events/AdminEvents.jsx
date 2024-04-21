import AdminEventCard from "./AdminEventCard";
import AdminAddEventCard from "./AdminAddEventCard";
import { useRecoilState } from "recoil";
import { upcomingEventAtom } from "../../store/atoms/eventsAtom";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { useAdminActions } from "../../services/actions/AdminActions";
import { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Events = () => {
  const [events, setEvents] = useRecoilState(upcomingEventAtom);
  console.log(events);
  const adminAction = useAdminActions();
  const [edit, setEdit] = useState({});
  const [eventDetails, setEventDetails] = useState({});
  console.log(eventDetails);
  const navigate = useNavigate();

  async function deleteEvent(id) {
    await adminAction.deleteEvent(id);
    const filtered = events.events.filter((event) => id !== event._id);
    console.log(filtered);
    setEvents((prev) => ({ ...prev, events: filtered }));
  }
  const exportPdf = async () => {
    const doc = new jsPDF({ orientation: "landscape" });

    doc.autoTable({
      html: "#my-table",
    });

    doc.save("mypdf.pdf");
  };
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
          <button
            className="p-3  rounded-lg  bg-bluePurple "
            onClick={exportPdf}
          >
            <p className="text-white text-sm">Download</p>
          </button>
        </div>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          id="my-table"
        >
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Month
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Time
              </th>
              <th scope="col" class="px-6 py-3">
                Club Name
              </th>
              <th scope="col" class="px-6 py-3">
                Event Name
              </th>
              <th scope="col" class="px-6 py-3">
                Event Status
              </th>
              <th scope="col" class="px-6 py-3">
                Registered <br />
                Participants
              </th>
              <th scope="col" class="px-6 py-3">
                Location
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {events.events.map((event) => {
              if (edit.status && event._id === edit.id) {
                return (
                  <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {event.eventDateAndTime.monthName}
                    </th>
                    <td class="px-6 py-4">{event.eventDateAndTime.date}</td>
                    <td class="px-6 py-4">
                      {event.eventDateAndTime.hours}:
                      {event.eventDateAndTime.minutes}:
                      {event.eventDateAndTime.AmOrPM}
                    </td>
                    <td class="px-6 py-4">
                      <input
                        className=" rounded  p-2 border-2 border-bluePurple "
                        type="text"
                        name="category"
                        value={eventDetails.category}
                        onChange={(e) => {
                          if (eventDetails._id) {
                            return setEventDetails((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }));
                          }
                        }}
                      />
                    </td>
                    <td class="px-6 py-4">
                      <input
                        className="border-bluePurple rounded p-2 border-2 "
                        type="text"
                        name="eventTitle"
                        value={eventDetails.eventTitle}
                        onChange={(e) => {
                          if (eventDetails._id) {
                            return setEventDetails((prev) => ({
                              ...prev,
                              eventTitle: e.target.value,
                            }));
                          }
                        }}
                      />
                    </td>
                    <td class="px-6 py-4">
                      <select name="event-status" id="event-status">
                        <option value="Scheduled">Scheduled</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td class="px-6 py-4">
                      <Button
                        name={"Open"}
                        styleclass={"bg-bluePurple rounded text-white"}
                        onClick={() => {
                          console.log(event._id);
                          navigate(`/admin/event/${event._id}/students`);
                        }}
                      />
                    </td>
                    <td class="px-6 py-4">{event.eventVenue}</td>
                    <td class="px-6 py-4 flex gap-1">
                      <Button
                        name={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        }
                        styleclass={"bg-bluePurple rounded text-white"}
                        onClick={() => {
                          // setEventDetails({});
                          // setEdit({});
                        }}
                      />

                      <Button
                        name={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        }
                        styleclass={"bg-failureRed rounded text-white"}
                        onClick={() => deleteEvent(event._id)}
                      />
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {event.eventDateAndTime.monthName}
                    </th>
                    <td class="px-6 py-4">{event.eventDateAndTime.date}</td>
                    <td class="px-6 py-4">
                      {event.eventDateAndTime.hours}:
                      {event.eventDateAndTime.minutes}:
                      {event.eventDateAndTime.AmOrPM}
                    </td>
                    <td class="px-6 py-4">{event.category}</td>
                    <td class="px-6 py-4">{event.eventTitle}</td>
                    <td class="px-6 py-4">{"Scheduled"}</td>
                    <td class="px-6 py-4">
                      <Button
                        name={"Open"}
                        styleclass={"bg-bluePurple rounded text-white"}
                        onClick={() => {
                          console.log(event._id);
                          navigate(`/admin/event/${event._id}/students`);
                        }}
                      />
                    </td>
                    <td class="px-6 py-4">{event.eventVenue}</td>
                    <td class="px-6 py-4 flex gap-1">
                      <Button
                        name={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                        }
                        styleclass={"bg-bluePurple rounded text-white"}
                        onClick={() => {
                          setEventDetails(event);
                          setEdit({
                            id: event._id,
                            status: true,
                            event: event,
                          });
                        }}
                      />

                      <Button
                        name={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        }
                        styleclass={"bg-failureRed rounded text-white"}
                        onClick={() => deleteEvent(event._id)}
                      />
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;
