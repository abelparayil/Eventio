/* eslint-disable react/no-unescaped-entities */

import UpcomingEvents from "../components/events/UpcomingEvents";
import IntroductoryText from "../components/ui/IntroductoryText";
import Banner from "../components/ui/Banner";

const LandingPage = () => {
  return (
    <div className="h-full bg-ghostWhite">
      <IntroductoryText />
      <Banner />
      <UpcomingEvents />
    </div>
  );
};

export default LandingPage;
