import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { asyncRegisterUser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";

// const navigate = useNavigate();

const Register = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const RegisterHandler = (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    user.cart = [];
    dispatch(asyncRegisterUser(user));
    reset();
    navigate("/login");
  };
  return (
    <form
      onSubmit={handleSubmit(RegisterHandler)}
      className="p-5 flex flex-col  justify-center border border-white/20 rounded-xl w-[35%] mx-auto my-20"
    >
      <h1 className="text-3xl font-md mb-5 text-start">Create Your Account</h1>
      <p className="items-satrt mb-2 px-1">
        Enter your Username <span className="text-red-400 text-xl">*</span>
      </p>
      <input
        className="p-2 border w-full mb-2 border-white/10 rounded bg-transparent backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 outline-none"
        {...register("username", { required: "This field is important" })}
        type="text"
        placeholder="Enter Your Username"
      />
      <small className="text-red-400 text-md ml-1 mb-5">
        {errors?.email?.message}
      </small>
      <p className="items-satrt mb-2 px-1">
        Enter your Email Id <span className="text-red-400 text-xl">*</span>
      </p>
      <input
        className="p-2 border w-full  border-white/10 rounded bg-transparent backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 outline-none"
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
        className="p-2 border w-full  border-white/10 bg-transparent backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 outline-none"
        {...register("password", { required: "This field is important" })}
        type="password"
        placeholder="Enter Password"
      />
      <small className="text-red-400 text-md ml-1 mb-10">
        {errors?.password?.message}
      </small>
      <button className="text-start text-xl mb-5 border w-content px-5 py-2 border-white/20 rounded-xl hover:bg-white hover:text-black hover:cursor-pointer transition 0.3s ease">
        Register
      </button>

      <p className="items-start text-center">
        Already have an account?
        <Link className="border-b cursor-pointer" to="/login">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;
