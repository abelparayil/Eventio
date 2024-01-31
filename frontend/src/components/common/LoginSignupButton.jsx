import Button from "./Button";

const LoginSignupButton = () => {
  return (
    <div className="flex justify-end absolute top-4 right-4">
      <Button bg={"bg-mercury rounded-l-lg"} name={"Login"} />
      <Button bg={"bg-bluePurple rounded text-white"} name={"Sign Up"} />
    </div>
  );
};

export default LoginSignupButton;
