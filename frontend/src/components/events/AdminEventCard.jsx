import { useEffect, useState } from "react";
import NoImage from "../../assets/images/noimage.jpeg";
import Button from "../common/Button";
import axios from "axios";

const URL = "http://localhost:9000";
const AdminEventCard = ({ image, title }) => {
  const [imageError, setImageError] = useState(false);
  let imageSrc = NoImage;
  if (!imageError) {
    imageSrc = URL + `/${image.imgName}`;
  }
  useEffect(() => {
    axios
      .get(URL + `/${image.imgName}`)
      .then(() => setImageError(false))
      .catch(() => setImageError(true));
  }, [image.imgName]);
  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-4 flex justify-center ">
      <div className="p-3  border-bluePurple border-4 rounded-lg">
        <img src={imageSrc} className=" w-56 lg:w-80 h-44" alt="" />
        <p className="text-center p-4 text-xl text-bluePurple">{title}</p>
        <div className="flex justify-center">
          <div className="flex flex-col gap-3 text-white ">
            <Button
              name={"Student List"}
              styleclass={"bg-bluePurple rounded-full border border-black "}
            />
            <Button
              name={"Edit"}
              styleclass={"bg-bluePurple rounded-full border border-black"}
            />
            <Button
              name={"Delete"}
              styleclass={"bg-bluePurple rounded-full border border-black "}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEventCard;
