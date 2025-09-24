import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncLoginUser } from "../store/actions/UserActions";

const Login = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const loginHandler = (user) => {
    dispatch(asyncLoginUser(user));
    navigate("/")
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(loginHandler)}
      className="p-5 flex flex-col justify-center border border-white/20 rounded-xl w-[35%] mx-auto my-20"
    >
      <h1 className="text-4xl font-md mb-2 text-start">Welcome back</h1>
      <small className="mb-5 ">Enter your details to get started</small>
      <p className="items-satrt mb-2 px-1">
        Enter your Email Id <span className="text-red-400 text-xl">*</span>
      </p>
      <input
        className="p-2 border w-full mb-2 border-white/10 rounded bg-transparent backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 outline-none"
        {...register("email", { required: "This field is important" })}
        type="email"
        placeholder="Enter Email Id"
      />
      <small className="text-red-400 text-md ml-1 mb-5">
        {errors?.email?.message}
      </small>
      <p className="items-satrt mb-2 px-1">
        Enter your Password <span className="text-red-400 text-xl">*</span>
      </p>

      <input
        className="p-2 border w-full mb-2 border-white/10 bg-transparent backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 outline-none"
        {...register("password", { required: "This field is important" })}
        type="password"
        placeholder="Enter Password"
      />
      <small className="text-red-400 text-md ml-1 mb-10">
        {errors?.password?.message}
      </small>
      <button className="text-start text-xl mb-5 border w-content px-5 py-2 border-white/20 rounded-xl hover:bg-white hover:text-black hover:cursor-pointer transition 0.3s ease">
        Login
      </button>

      <p className="items-start text-center">
        Don't have an account?
        <Link className="border-b cursor-pointer" to="/register">
          Register
        </Link>
      </p>
    </form>
  );
};

export default Login;
