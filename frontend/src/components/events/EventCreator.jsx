const EventCreator = () => {
  return (
    <div className="flex pt-4 justify-center ">
      <div className="flex flex-col gap-4">
        <div>
          <label className="block" htmlFor="title">
            Event Title
          </label>
          <input
            className="w-full p-1 rounded"
            type="text"
            name="title"
            placeholder="Enter Title"
          />
        </div>
        <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-5 gap-1 ">
          <div className="flex items-center ps-4 bg-white  rounded text-sm ">
            <input
              type="radio"
              id="celebratory-club"
              name="Radiobutton-group"
              value={"celebratory-club"}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
            />
            <label
              htmlFor="celebratory-club"
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 "
            >
              Celebratory Club
            </label>
          </div>
          <div className="flex items-center ps-4 bg-white  rounded ">
            <input
              id="technical-club"
              type="radio"
              value={"technical-club"}
              name="Radiobutton-group"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
            />
            <label
              htmlFor="technical-club"
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 "
            >
              Technical Club
            </label>
          </div>
          <div className="flex items-center ps-4 bg-white  rounded ">
            <input
              id="artmusic-club"
              type="radio"
              value={"artmusic-club"}
              name="Radiobutton-group"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
            />
            <label
              htmlFor="artmusic-club"
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 "
            >
              Art & Music Club
            </label>
          </div>
          <div className="flex items-center ps-4 bg-white  rounded ">
            <input
              id="sports-club"
              type="radio"
              value={"sports-club"}
              name="Radiobutton-group"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
            />
            <label
              htmlFor="sports-club"
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 "
            >
              Sports Club
            </label>
          </div>
          <div className="flex items-center ps-4 bg-white  rounded ">
            <input
              id="dance-club"
              type="radio"
              value={"dance-club"}
              name="Radiobutton-group"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
            />
            <label
              htmlFor="dance-club"
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 "
            >
              Dance Club
            </label>
          </div>
        </div>
        <div>
          <label className="block" htmlFor="title">
            Event Venue
          </label>
          <input
            className="w-full p-1 rounded"
            type="text"
            name="venue"
            placeholder="Enter Venue"
          />
        </div>
        <div>
          <label className="block" htmlFor="title">
            Time
          </label>
          <input
            className="w-full p-1 rounded"
            type="time"
            name="time"
            placeholder="Enter Time"
          />
        </div>
        <div className="flex w-full	 gap-2">
          <div>
            <label className="block" htmlFor="title">
              Start Date
            </label>
            <input
              className="p-1 rounded"
              type="date"
              name="startdate"
              placeholder="Enter  Date"
            />
          </div>
          {/* <div>
        <label className="block" htmlFor="title">
          End Date
        </label>
        <input
          className="w-full p-1 rounded"
          type="date"
          name="endDate"
          placeholder="Enter End Date"
        />
      </div> */}
        </div>
        <div>
          <label htmlFor="ticketPrice" className="block">
            Ticket Price
          </label>
          <input
            className="w-full p-1 rounded"
            type="text"
            name="ticketPrice"
            placeholder="Enter Amount"
          />
        </div>
      </div>
    </div>
  );
};

export default EventCreator;
