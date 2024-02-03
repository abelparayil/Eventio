import { useForm } from "react-hook-form";




import { useAdminActions } from "../services/actions/AdminActions";

const AdminLogin = () => {
  const { register, handleSubmit } = useForm();
  const adminActions = useAdminActions();

  function onSubmit({ email, password }) {
    const data = adminActions.login(email, password);
    return data;
  }

  return (
    <div>
      <h1>Eventio</h1>
      <div>AdminLogin</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", {
            required: { value: true, message: "Email should be Valid" },
          })}
          type="email"
          placeholder="Enter your mail"
        />
        <input
          {...register("password", { required: true })}
          placeholder="Enter your password"
          type="password"
        />
        <button type="submit">Sign In </button>
      </form>
    </div>
  );
};

export default AdminLogin;
