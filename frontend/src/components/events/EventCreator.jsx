const EventCreator = ({ register, errors }) => {
  const Currentdate = new Date();
  const currentdate = Currentdate.getDate();
  const currentMonth =
    Currentdate.getMonth() + 1 > 10
      ? Currentdate.getMonth() + 1
      : `0${Currentdate.getMonth() + 1}`;
  const currentYear = Currentdate.getFullYear();
  const checkdate = `${currentYear}-${currentMonth}-${currentdate}`;
  return (
    <div className="flex h-auto  pt-4 justify-center ">
      <div className="flex flex-col w-full p-4 md:w-1/2 gap-4">
        <div>
          <label className="block" htmlFor="title">
            Event Title
          </label>
          <input
            {...register("eventTitle", {
              required: { value: true, message: "Title Can't Be Empty" },
              minLength: {
                value: 4,
                message: "Title Should be Above 4 Characters",
              },
            })}
            className="w-full p-1 rounded"
            type="text"
            placeholder="Enter Title"
          />
          {errors.eventTitle ? (
            <span className="text-magentaRed">{errors.eventTitle.message}</span>
          ) : null}
        </div>
        <div className="grid grid-cols-1   md:grid-cols-3 lg:grid-cols-5 gap-1 ">
          <div className="flex items-center ps-4 bg-white  rounded text-sm ">
            <input
              {...register("radio")}
              type="radio"
              id="celebratory-club"
              value="celebratory-club"
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
              {...register("radio")}
              type="radio"
              id="technical-club"
              value="technical-club"
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
              {...register("radio")}
              id="artmusic-club"
              type="radio"
              value="artmusic-club"
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
              {...register("radio")}
              id="sports-club"
              type="radio"
              value="sports-club"
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
              {...register("radio")}
              id="dance-club"
              type="radio"
              value="dance-club"
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
            {...register("venue", {
              required: { value: true, message: "Venue Can't be Empty" },
            })}
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
            {...register("time", {
              required: { value: true, message: "Time Can't be Empty" },
            })}
            className="w-full p-1 rounded"
            type="time"
            name="time"
            placeholder="Enter Time"
          />
        </div>
        <div className="flex w-full	 gap-2">
          <div>
            <label className="block" htmlFor="startdate">
              Start Date
            </label>
            <input
              {...register("startdate", {
                required: {
                  value: true,
                  message: "Starting Date Can't be Empty",
                },
                validate: (value) => value > checkdate,
              })}
              className="p-1 rounded"
              type="date"
              name="startdate"
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
          <label htmlFor="ticketprice" className="block">
            Ticket Price
          </label>
          <input
            {...register("ticketprice")}
            className="w-full p-1 rounded"
            type="text"
            name="ticketprice"
            placeholder="Enter Amount"
          />
        </div>
      </div>
    </div>
  );
};

export default EventCreator;
