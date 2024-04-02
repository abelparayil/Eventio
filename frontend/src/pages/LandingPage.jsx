/* eslint-disable react/no-unescaped-entities */

import UpcomingEvents from "../components/events/UpcomingEvents";
import IntroductoryText from "../components/ui/IntroductoryText";
import Banner from "../components/ui/Banner";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ isLogin }) => {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-mainBg">
      <IntroductoryText />
      <Banner />
      <UpcomingEvents />
      {isLogin ? (
        <div className="flex justify-center mb-6">
          <Button
            name={"Registered Events"}
            styleclass={"bg-violetBlue text-white rounded-md"}
            onClick={() => navigate("/user/registered-events")}
          />
        </div>
      ) : null}
    </div>
  );
};

export default LandingPage;
