import React, { useEffect } from "react";
import { useState } from "react";
import { useUserActions } from "../../services/actions/UserActions";
import Button from "../common/Button";

const UserFilterEvent = ({ setEvents }) => {
  const [filter, setFilter] = useState({
    category: "",
    venue: "",
    startDate: "",
    endDate: "",
  });
  const [filterDrop, setFilterDrop] = useState(true);
  const [venues, setVenues] = useState([]);
  const userAction = useUserActions();
  console.log(filter);
  useEffect(() => {
    async function getAllVenues() {
      const data = await userAction.getAllVenues();
      setVenues(data);
    }
    getAllVenues();
  }, []);

  function onChangeFilterHandler(e) {
    setFilter((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function onClickSearch() {
    const data = await userAction.filteredEvents(filter);
    setEvents(data);
  }
  return (
    <div className="relative mt-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 mr-7 "
        onClick={() => setFilterDrop((prev) => !prev)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
        />
      </svg>
      <div
        className={
          filterDrop
            ? `md:z-10  max-h-full absolute md:right-6 md:top-6 `
            : `hidden`
        }
      >
        <div className=" bg-ghostWhite">
          <div className="flex">
            <label htmlFor="category">Category:</label>
            <select
              value={filter.category}
              name="category"
              onChange={onChangeFilterHandler}
              id="category"
            >
              <option value="">All</option>
              <option value="celebratory-club">Celebratory Club</option>
              <option value="technical-club">Technical Club</option>
              <option value="artmusic-club">Art & Music Club</option>
              <option value="sports-club"> Sports Club</option>
              <option value="dance-club"> Dance Club</option>
            </select>
          </div>
          <div className="flex ">
            <label htmlFor="venue">Venues:</label>
            <select
              name="venue"
              value={filter.venue}
              onChange={onChangeFilterHandler}
              id="venue"
            >
              <option value="">All</option>
              {venues.map((venue) => {
                return <option value={venue}>{venue}</option>;
              })}
            </select>
          </div>
          <div className="flex">
            <label htmlFor="startDate">Start Date:</label>
            <input
              onChange={onChangeFilterHandler}
              type="date"
              name="startDate"
              id="startDate"
              value={filter.startDate}
            />
          </div>
          <div className="flex">
            <label htmlFor="endDate">End Date:</label>
            <input
              onChange={onChangeFilterHandler}
              type="date"
              name="endDate"
              value={filter.endDate}
              id="enddate"
            />
          </div>
          <div className="flex justify-between">
            <Button
              onClick={() =>
                setFilter({
                  category: "",
                  venue: "",
                  startdate: "",
                  endDate: "",
                })
              }
              name={"Reset"}
              styleclass={"bg-failureRed rounded  text-white "}
            />
            <Button
              name={"Search"}
              onClick={onClickSearch}
              styleclass={"bg-bluePurple rounded  text-white"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFilterEvent;
