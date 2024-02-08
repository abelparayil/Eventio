const Footer = () => {
  return (
    <div className="h-44  bg-bluePurple">
      <div className="flex justify-center items-baseline  gap-4 p-2  w-full text-white text-sm">
        <div>
          <h3 className=" text-base">
            <b>Get to Know Us</b>
          </h3>
          <p>About</p>
          <p>VIT Bhopal</p>
        </div>
        <div>
          <h3 className=" text-base">
            <b>Connect With Us</b>
          </h3>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Twitter</p>
        </div>
        <div>
          <h3 className=" text-base">
            {" "}
            <b>Organise an Event</b>
          </h3>
          <p>Admin</p>
          <p>
            Inform Admin <br /> About an Event
          </p>
        </div>
      </div>
      <div className="flex justify-center text-center text-lg text-white">
        <div>
          <h2>Eventio</h2>
          <h2>VIT Bhopal</h2>
        </div>
      </div>
    </div>
  );
};

export default Footer;
