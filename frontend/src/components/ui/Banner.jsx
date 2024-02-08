/* eslint-disable react/no-unescaped-entities */
import BannerImage from "../../assets/images/banner.png";

const Banner = () => {
  return (
    <div className="px-9 pt-5 h-screen hidden relative lg:block">
      <img src={BannerImage} className="w-full h-full rounded" alt="" />
      <div className="absolute top-1/2   left-23">
        <h1 className=" font-satisfy text-4xl lg:text-6xl text-white">
          "Dream, Plan, Celebrate – Your unforgettable events start here!"
        </h1>
      </div>
    </div>
  );
};

export default Banner;
