import { useForm } from "react-hook-form";

const AdminLogin = () => {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <h1>Eventio</h1>
      <div>AdminLogin</div>
      <form>
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Enter your mail"
        />
        <input
          {...register("password", { required: true })}
          placeholder="Enter your password"
        />
        <button type="submit">Sign In </button>
      </form>
    </div>
  );
};

export default AdminLogin;
