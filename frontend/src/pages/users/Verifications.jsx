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
    //   navigate("/user/signin");
    // }
  }, [userEnteredData, navigate]);

  async function handleSendOtp() {
    const checkedOTP = await userActions.checkOTP(userEnteredData.email, otp);
    if (checkedOTP) {
      const signupRes = await userActions.signup(
        userEnteredData.name,
        userEnteredData.email,
        userEnteredData.password
      );
      if (signupRes) {
        //show signedup succesufully toast message
      }
    } else {
      return "OTP incorrect";
    }
  }
  return (
    <div>
      <OtpInput
        containerStyle={"p-4"}
        inputStyle={"p-2 bg-black text-white"}
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
      />
      <Button
        name={"Send OTP"}
        onClick={() => handleSendOtp()}
        styleclass={"bg-bluePurple rounded"}
      />
    </div>
  );
};

export default Verifications;
