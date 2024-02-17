import LoginSignupButton from "../common/LoginSignupButton";

const Header = () => {
  return (
    <div className="max-w-min p-4">
      <h1 className="text-4xl font-sarala">Eventio</h1>
      <LoginSignupButton isLogin={true} />
    </div>
  );
};

export default Header;
