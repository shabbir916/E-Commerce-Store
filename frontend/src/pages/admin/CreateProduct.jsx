import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { asyncCreateProduct } from "../../store/actions/productActions";
import { useDispatch } from "react-redux";

const CreateProduct = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const CreateProductHandler = (product) => {
    product.id = nanoid();
    dispatch(asyncCreateProduct(product));
    reset();
    navigate("/");
  };
  return (
    <form
      onSubmit={handleSubmit(CreateProductHandler)}
      className="p-5 flex flex-col justify-center border border-white/20 rounded-xl w-[35%] mx-auto my-10"
    >
      <h1 className="text-3xl font-md mb-5 text-start">Create Your Product</h1>
      <input
        className="p-2 border w-full mb-2 border-white/10 rounded bg-transparent backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 outline-none"
        {...register("image", { required: "This field is important" })}
        type="url"
        placeholder="Image URL"
      />
      <small className="text-red-400 text-md ml-1 mb-5">
        {errors?.image?.message}
      </small>
      <input
        className="p-2 border w-full  border-white/10 rounded bg-transparent backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 outline-none"
        {...register("category", { required: "This field is important" })}
        type="text"
        placeholder="Select Product Category"
      />
      <small className="text-red-400 text-md ml-1 mb-5">
        {errors?.category?.message}
      </small>
      <p className="items-satrt mb-2 px-1">
        Enter Product title <span className="text-red-400 text-xl">*</span>
      </p>
      <input
        className="p-2 border w-full mb-2 border-white/10 rounded bg-transparent backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 outline-none"
        {...register("title", { required: "This field is important" })}
        type="text"
        placeholder="Enter Title"
      />
      <small className="text-red-400 text-md ml-1 mb-5">
        {errors?.title?.message}
      </small>
      <p className="items-satrt mb-2 px-1">
        Enter Product Price <span className="text-red-400 text-xl">*</span>
      </p>
      <input
        className="p-2 border w-full  border-white/10 rounded bg-transparent backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 outline-none no-spinner"
        {...register("price", {
          required: "This field is important",
          valueAsNumber: true,
          min: { value: 500, message: "Price should not be below 500" },
        })}
        type="number"
        min="500"
        placeholder="Enter Price"
      />
      <small className="text-red-400 text-md ml-1 mb-5">
        {errors?.price?.message}
      </small>
      <p className="items-satrt mb-2 px-1">
        Enter Product Description{" "}
        <span className="text-red-400 text-xl">*</span>
      </p>

      <textarea
        className="p-2 border w-full  border-white/10 bg-transparent backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 outline-none"
        {...register("description", { required: "This field is important" })}
        placeholder="Enter Product Description..."
      ></textarea>
      <small className="text-red-400 text-md ml-1 mb-5">
        {errors?.description?.message}
      </small>

      <button className="text-start text-xl mb-5 border w-content px-5 py-2 border-white/20 rounded-xl hover:bg-white hover:text-black hover:cursor-pointer transition 0.3s ease">
        Create Product
      </button>
    </form>
  );
};

export default CreateProduct;
