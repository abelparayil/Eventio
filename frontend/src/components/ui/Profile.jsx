import Button from "../common/Button";

const Profile = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="p-5 border-2 rounded">
        <div className="text-3xl p-5 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          <h1>Mrudul Mohan</h1>
        </div>
        <div className=" p-5">
          <h2 className=" mb-4 text-2xl">Name:Mrudul Mohan</h2>
          <h2 className="text-2xl">Email:admin@gmail.com</h2>
        </div>
        <div className="flex justify-end">
          <Button name={"EDIT"} styleclass={"bg-bluePurple rounded"} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
