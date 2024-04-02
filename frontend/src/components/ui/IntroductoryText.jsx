import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
const IntroductoryText = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="grid content-center  h-screen" data-aos="zoom-in-up">
      <h1 className="text-3xl  lg:text-6xl text-center font-spyRice">
        Unleash the{" "}
        <span className=" text-magentaRed font-sarala">
          extraordinary in every celebration!
        </span>
      </h1>
    </div>
  );
};

export default IntroductoryText;
