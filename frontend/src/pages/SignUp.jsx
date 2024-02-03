import Button from "../components/common/Button";
import { useUserActions } from "../services/actions/UserActions";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const userActions = useUserActions();
  function onSubmit({ name, email, password }) {
    // console.log(name, email, password);
    const data = userActions.signup({ name, email, password });
    console.log(data);
  }

  console.log(errors);
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
            {...register("name", {
              required: true,
              minLength: { value: 5, message: "minimum character should be 5" },
            })}
            type="text"
            placeholder="Your Name"
          />
          {errors.name ? <span>{errors.name.message}</span> : " "}
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Enter Your Email"
          />
          {errors.email ? <span>{errors.email.message}</span> : " "}
          <input
            {...register("password", {
              required: true,
              maxLength: {
                value: 10,
                message: "Password Length should be less than 10 characters",
              },
              minLength: {
                value: 5,
                message: "Your password must have atleast 6 characters",
              },
            })}
            type="password"
            name="password"
            placeholder="Password"
          />
          {errors.password ? <span>{errors.password.message}</span> : " "}
          <input
            {...register("confirmpassword", {
              required: true,
              validate: (val) => {
                if (watch("password") != val) {
                  return "The password and confirmation password do not match";
                }
              },
            })}
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
          />

          {errors.confirmpassword ? (
            <span>{errors.confirmpassword.message}</span>
          ) : (
            " "
          )}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
