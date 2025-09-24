import { Link } from "react-router-dom";

const ProductTemplate = ({ product }) => {
  return (
    <div
      className="mb-20 px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto"
      key={product.id}
    >
      <div className="rounded-md bg-transparent flex flex-col items-center h-full">
        <div className="w-full h-full rounded-md flex items-center justify-center">
          <img
            className="w-full h-full object-cover border border-blue-300 p-5 rounded-md"
            src={product.image}
            alt={product.title}
          />
        </div>

        <h1 className="mt-3 text-[1.1rem] w-full text-center truncate">
          {product.title}
        </h1>
        <h3 className="text-[1.3rem] mt-2">
          <span className="text-[1.3rem]">price:</span> ₹{product.price}
        </h3>

        <Link
          className="border py-2 px-5 text-md mt-4 rounded-md hover:bg-white hover:text-black"
          to={`/product/${product.id}`}
        >
          More Info
        </Link>
      </div>
    </div>
  );
};

export default ProductTemplate;
