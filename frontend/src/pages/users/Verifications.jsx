import { useRecoilValue } from "recoil";
import { userDataAtom } from "../../store/atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import Button from "../../components/common/Button";
import { useUserActions } from "../../services/actions/UserActions";

const Verifications = () => {
  const userEnteredData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const userActions = useUserActions();
  const [otp, setOtp] = useState("");

  useEffect(() => {
    // if (!userEnteredData.email) {
    //   navigate("/user/login");
    // }
    // axios.get("/opt"); //otp generate email send
  }, [userEnteredData, navigate]);
  console.log(userEnteredData);
  async function handleResend() {
    await userActions.resendOTP(userEnteredData.email);
  }
  async function handleSendOtp() {
    await userActions.checkOTP(userEnteredData.email, otp);
  }
  return (
    <div className="h-screen w-full  ">
      <div className="flex justify-center h-screen flex-col gap-2 items-center">
        <OtpInput
          inputStyle={{
            border: "1px solid transparent",
            borderRadius: "8px",
            width: "54px",
            height: "54px",
            fontSize: "12px",
            color: "#000",
            fontWeight: "400",
            caretColor: "blue",
          }}
          focusStyle={{
            border: "1px solid #CFD3DB",
            outline: "none",
          }}
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
        <Button
          name={"Send OTP"}
          onClick={() => handleSendOtp()}
          styleclass={"bg-bluePurple rounded text-white"}
        />
        <Button
          name={"Resend"}
          styleclass={"text-black bg-bluePurple rounded text-white"}
          onClick={() => handleResend()}
        />
      </div>
    </div>
  );
};

export default Verifications;
