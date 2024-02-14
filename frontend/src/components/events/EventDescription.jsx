const EventDescription = ({ register, errors }) => {
  console.log(errors);
  return (
    <div className="flex  pt-4 justify-center">
      <div className="flex flex-col p-4 w-full md:w-1/2">
        <h2 className="text-3xl text-center">Event Description</h2>
        <div className="flex flex-col gap-4 w-full">
          <label htmlFor="event-image">Event Image</label>
          <input
            {...register("eventImage", {
              required: {
                value: true,
                message: "Image Can't be Empty",
              },
            })}
            type="file"
            accept="image/png, image/jpeg"
            name="eventImage"
            id="event-image"
          />
          <label htmlFor="event-description">Event Description</label>
          <textarea
            {...register("description", {
              required: {
                value: true,
                message: "Description Can't be Empty",
              },
              minLength: {
                value: 40,
                message: "Description should be min of 40 Character",
              },
            })}
            rows={6}
            placeholder="type here ...."
            id="event-description"
          />
        </div>
        <button className="bg-bluePurple p-2 rounded mt-3" type="submit">
          Create Event
        </button>
      </div>
    </div>
  );
};

export default EventDescription;
