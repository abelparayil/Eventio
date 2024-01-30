import Button from "../components/common/Button";

const LandingPage = () => {
  return (
    <div className="flex justify-end">
      <Button bg={"bg-slate-400"} name={"Login"} />
      <Button bg={"bg-bluePurple text-white"} name={"Sign Up"} />
    </div>
  );
};

export default LandingPage;
