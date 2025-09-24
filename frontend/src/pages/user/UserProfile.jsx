import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  asyncDeleteuser,
  asyncLogoutUser,
  asyncUpdateUser,
} from "../../store/actions/UserActions";

const UserProfile = () => {
  const { users } = useSelector((state) => state.user);

  // console.log(product,users)
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: users.image,
      username: users?.username,
      email: users?.email,
      password: users?.password,
    },
  });
  const dispatch = useDispatch();

  const UpdateProfileHandler = (user) => {
    dispatch(asyncUpdateUser(users.id, user));
  };

  const DeleteHandler = () => {
    dispatch(asyncDeleteuser(users.id));
    navigate("/register");
  };

  const LogoutUserHandler = () => {
    dispatch(asyncLogoutUser());
    navigate("/login");
  };

  return users ? (
    <div className="w-full flex">
      <div className="details w-[40%] flex flex-col ">
        <img
          src={users.image}
          className="w-70 h-90 border-5 border-blue-200 p-2 rounded-4xl mx-auto mt-10 object-cover hover:border-blue-300"
        />
        <h1 className="mx-auto text-4xl mt-5 text-blue-200">
          {users.username}
        </h1>
        <h3 className="mx-auto text-2xl mt-1 text-blue-200">{users.email}</h3>
      </div>
      <div className="line border-l my-8 text-blue-300  rounded-xl"></div>
      <form
        onSubmit={handleSubmit(UpdateProfileHandler)}
        className=" w-[60%] p-5 flex flex-col justify-center  rounded-xl  mx-10 "
      >
        <h1 className="text-3xl font-md mb-5 text-start mt-2">
          Update Your Profile
        </h1>

        <input
          className="p-2 border w-full mb-2 border-white/10 rounded bg-transparent backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 outline-none"
          {...register("image", { required: "This field is important" })}
          type="url"
          placeholder="Image URL"
        />

        <p className="items-satrt mb-2 px-1">
          Enter Username <span className="text-red-400 text-xl">*</span>
        </p>
        <input
          className="p-2 border w-full mb-5 border-white/10 rounded bg-transparent backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 outline-none"
          {...register("username")}
          type="text"
          placeholder="Joh-Doe"
        />

        <p className="items-satrt mb-2 px-1">
          Enter Email <span className="text-red-400 text-xl">*</span>
        </p>
        <input
          className="p-2 border w-full mb-5 border-white/10 rounded bg-transparent backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 outline-none"
          {...register("email")}
          type="email"
          placeholder="John-Doe@Gmail.com"
        />

        <p className="items-satrt mb-2 px-1">
          Enter Password <span className="text-red-400 text-xl">*</span>
        </p>
        <input
          className="p-2 border w-full mb-10 border-white/10 rounded bg-transparent backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 outline-none"
          {...register("password")}
          type="password"
          placeholder="*****"
        />

        <div className="btn flex gap-10">
          <button className="text-start text-2xl mb-5 border w-content px-5 py-2 bg-blue-200 cursor-pointer text-black hover:bg-blue-300 rounded-md">
            Update User
          </button>
          <button
            type="button"
            onClick={DeleteHandler}
            className="text-start text-2xl mb-5 border w-content px-5 py-2  bg-red-200 cursor-pointer text-black hover:bg-red-300 rounded-md"
          >
            Delete User
          </button>
          <button
            type="button"
            onClick={LogoutUserHandler}
            className="text-start text-2xl mb-5 border w-content px-5 py-2  bg-red-200 cursor-pointer text-black hover:bg-red-300 rounded-md"
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  ) : (
    "Loading User Data"
  );
};

export default UserProfile;
