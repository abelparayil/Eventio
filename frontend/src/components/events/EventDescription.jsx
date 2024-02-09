const EventDescription = () => {
  return (
    <div className="flex  pt-4 justify-center">
      <div className="flex flex-col">
        <h2 className="text-2xl">Event Description</h2>
        <div className="flex flex-col">
          <label htmlFor="event-image">Event Image</label>
          <input type="file" name="event-image" id="event-image" />
        </div>
      </div>
    </div>
  );
};

export default EventDescription;
