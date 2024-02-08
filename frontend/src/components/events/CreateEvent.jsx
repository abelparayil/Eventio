import Button from "../common/Button";
import LoginSignupButton from "../common/LoginSignupButton";

const CreateEvent = () => {
  return (
    <div className="h-screen bg-mercury">
      <LoginSignupButton isLogin={true} />
      <Button
        styleclass={"bg-bluePurple rounded-full text-white"}
        name={"Go Back"}
      />
      <h1 className="text-4xl text-center rounded">CreateEvent</h1>
      <div className="flex justify-center w-full">
        <div className="flex flex-col pt-4 ">
          <div className="flex flex-col w-1/2 gap-4">
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
            <div className="flex gap-2">
              <div>
                <label className="block" htmlFor="title">
                  Start Date
                </label>
                <input
                  className="w-full p-1 rounded"
                  type="date"
                  name="startdate"
                  placeholder="Enter Start Date"
                />
              </div>
              <div>
                <label className="block" htmlFor="title">
                  End Date
                </label>
                <input
                  className="w-full p-1 rounded"
                  type="date"
                  name="endDate"
                  placeholder="Enter End Date"
                />
              </div>
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
          <div className="flex">
            <h2>Event Description</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
