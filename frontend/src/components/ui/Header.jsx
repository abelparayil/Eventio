import LoginSignupButton from "../common/LoginSignupButton";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className=" w-full p-4 flex justify-between mr-4">
      <h1
        className="text-4xl text-bluePurple font-sarala"
        onClick={() => navigate("/user/home")}
      >
        Eventio
      </h1>
      <LoginSignupButton />
    </div>
  );
};

export default Header;
