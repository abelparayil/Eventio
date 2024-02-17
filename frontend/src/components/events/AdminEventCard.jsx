import Image from "../../assets/images/Advitya.png";
import Button from "../common/Button";

const AdminEventCard = () => {
  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-4 flex justify-center ">
      <div className="p-3  border-bluePurple border-4 rounded-lg">
        <img src={Image} className=" w-56 lg:w-80 h-44" alt="" />
        <p className="text-center p-4 text-xl text-bluePurple">Holi</p>
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
