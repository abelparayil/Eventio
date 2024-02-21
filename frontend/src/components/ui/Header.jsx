import LoginSignupButton from "../common/LoginSignupButton";

const Header = () => {
  return (
    <div className=" p-4 flex justify-between mr-4">
      <h1 className="text-4xl text-bluePurple font-sarala">Eventio</h1>
      <LoginSignupButton />
    </div>
  );
};

export default Header;
