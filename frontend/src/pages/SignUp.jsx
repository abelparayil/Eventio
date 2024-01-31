import Button from "../components/common/Button";
import { useForm } from "react-hook-form";
const SignUp = () => {
  const { register, handleSubmit } = useForm();
  function onSubmit(data) {
    console.log(data);
  }
  return (
    <div>
      <div>eventio</div>
      <div>signup to Eventio</div>
      <div>
        <Button name={"Sign In"} styleclass={"bg-bluePurple"} />
      </div>
      <div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", { required: true, maxLength: 10 })}
            type="text"
            placeholder="Your Name"
          />
          <input {...register("email", { required: true })} type="email" />
          <input
            {...register("password", { required: true, maxLength: 10 })}
            type="password"
            name="password"
            placeholder="Password"
          />
          <input
            {...register("confirmpassword", { required: true, maxLength: 10 })}
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
