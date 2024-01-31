import Button from "./Button";

const LoginSignupButton = () => {
  return (
    <div className="flex justify-end absolute top-4 right-4">
      <Button styleclass={"bg-mercury rounded-l-lg"} name={"Login"} />
      <Button
        styleclass={"bg-bluePurple rounded text-white"}
        name={"Sign Up"}
      />
    </div>
  );
};

export default LoginSignupButton;
