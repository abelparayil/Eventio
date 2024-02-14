import { useNavigate } from "react-router-dom";
import Button from "./Button";

const LoginSignupButton = ({ isLogin }) => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/user/login");
  }
  return (
    <div className="flex justify-end absolute top-4 right-4">
      {!isLogin ? (
        <>
          <Button
            styleclass={"bg-mercury rounded-l-lg"}
            name={"Login"}
            onClick={() => navigate("/user/login")}
          />
          <Button
            styleclass={"bg-bluePurple rounded text-white"}
            name={"Sign Up"}
            onClick={() => navigate("/user/signup")}
          />{" "}
        </>
      ) : (
        <Button
          styleclass={"bg-bluePurple rounded text-white"}
          name={"Log Out"}
          onClick={handleLogout}
        />
      )}
    </div>
  );
};

export default LoginSignupButton;
