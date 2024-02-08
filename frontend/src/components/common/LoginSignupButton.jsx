import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../store/atoms/authAtom";

const LoginSignupButton = ({ isLogin }) => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);
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
          onClick={setAuth({ isLogin: false, isAdmin: false, token: null })}
        />
      )}
    </div>
  );
};

export default LoginSignupButton;
