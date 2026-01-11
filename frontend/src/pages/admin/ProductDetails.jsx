import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  asyncUpdateProduct,
} from "../../store/actions/productActions";
import {
  asyncDeleteuser,
  asyncUpdateUser,
} from "../../store/actions/UserActions";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    product: { products },
    user: { users },
  } = useSelector((state) => state);
  const product = products?.find((product) => product.id == id);
  // console.log(product,users)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      description: product?.description,
      price: product?.price,
      category: product?.category,
    },
  });
  const dispatch = useDispatch();

  const UpdateProductHandler = (product) => {
    dispatch(asyncUpdateProduct(id, product));
    // reset();
  };

  const DeleteHandler = () => {
    dispatch(asyncDeleteuser(id));
    navigate("/products");
  };

  const AddToCartHandler = (product) => {
    const copyuser = { ...users, cart: [...users.cart] };
    const x = copyuser.cart.findIndex((c) => c?.product?.id == product);
    // console.log(x);
    if (x == -1) {
      copyuser.cart.push({ product, quantity: 1 });
    } else {
      copyuser.cart[x] = {
        product,
        quantity: copyuser.cart[x].quantity + 1,
      };
    }
    navigate("/cart");
    // console.log(copyuser);
    dispatch(asyncUpdateUser(copyuser.id, copyuser));
  };

  return product ? (
    <>
      <div className="w-full flex m-10">
        <img src={product.image} />
        <div className="line border-l ml-20 text-blue-300  rounded-xl"></div>
        <div className="w-1/2 h-full m-20 ">
          <h1 className="text-4xl">{product.title}</h1>
          <h4 className=" w-[80%] text-xl mt-5 opacity-50 font-thin tracking-wider">
            {product.description}
          </h4>
          <h3 className=" text-3xl mt-5 text-blue-200 ">
            <small className="text-md opacity-50">₹</small> {product.price}
          </h3>
          <button
            onClick={() => AddToCartHandler(product)}
            className="mt-10 py-2 px-7 rounded-md text-md bg-blue-200 cursor-pointer text-black font-bold hover:bg-blue-300"
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr className="mx-5 mt-15" />
      <div>
        {users && users?.isAdmin && (
          <form
            onSubmit={handleSubmit(UpdateProductHandler)}
            className="p-5 flex flex-col justify-center border border-white/20 rounded-xl  mx-10 my-10"
          >
            <h1 className="text-3xl font-md mb-5 text-start">
              Update Your Product
            </h1>
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
              Enter Product title{" "}
              <span className="text-red-400 text-xl">*</span>
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
              Enter Product Price{" "}
              <span className="text-red-400 text-xl">*</span>
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
              {...register("description", {
                required: "This field is important",
              })}
              placeholder="Enter Product Description..."
            ></textarea>
            <small className="text-red-400 text-md ml-1 mb-5">
              {errors?.description?.message}
            </small>

            <div className="btn flex gap-10">
              <button className="text-start text-2xl mb-5 border w-content px-5 py-2 bg-blue-200 cursor-pointer text-black hover:bg-blue-300 rounded-md">
                Update Product
              </button>
              <button
                type="button"
                onClick={DeleteHandler}
                className="text-start text-2xl mb-5 border w-content px-5 py-2  bg-red-200 cursor-pointer text-black hover:bg-red-300 rounded-md"
              >
                Delete Product
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  ) : (
    "Product Loading..."
  );
};

export default ProductDetails;
