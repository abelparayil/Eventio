/* eslint-disable react/no-unescaped-entities */

import UpcomingEvents from "../components/events/UpcomingEvents";
import IntroductoryText from "../components/ui/IntroductoryText";
import LoginSignupButton from "../components/common/LoginSignupButton";
import Banner from "../components/ui/Banner";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LoginSignupButton />
      <IntroductoryText />
      <Banner />
      <UpcomingEvents />
    </div>
  );
};

export default LandingPage;
