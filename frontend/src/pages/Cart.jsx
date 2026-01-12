import { useDispatch, useSelector } from "react-redux";
import { asyncUpdateUser } from "../store/actions/userActions";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const {
    product: { products },
    user: { users },
  } = useSelector((state) => state);

  const navigate = useNavigate();

  const DecreaseQtyHandler = (index, c) => {
    const copyuser = { ...users, cart: [...(users?.cart || [])] };
    if (copyuser.cart[index].quantity > 1) {
      copyuser.cart[index] = {
        product: c.product,
        quantity: copyuser.cart[index].quantity - 1,
      };
    } else {
      copyuser.cart.splice(index, 1);
      navigate("/");
    }
    dispatch(asyncUpdateUser(copyuser.id, copyuser));
  };

  const IncreaseQtyHandler = (index, c) => {
    const copyuser = { ...users, cart: [...(users?.cart || [])] };
    copyuser.cart[index] = {
      product: c.product,
      quantity: (copyuser.cart[index].quantity || 0) + 1,
    };
    dispatch(asyncUpdateUser(copyuser.id, copyuser));
  };

  const cartArray = Array.isArray(users?.cart) ? users.cart : [];

  const grandTotal = cartArray.reduce((sum, c) => {
    const unitPrice = Number(c?.product?.price) || 0;
    const qty = Number(c?.quantity) || 0;
    return sum + unitPrice * qty;
  }, 0);

  const cartItems = cartArray.map((c, index) => {
    const unitPrice = Number(c?.product?.price) || 0;
    const itemTotal = unitPrice * (c?.quantity || 0);

    return (
      <li
        className="mb-10 p-5 flex items-center justify-between border rounded-xl"
        key={c?.product?.id ?? index}
      >
        <div className="product flex gap-5">
          <img
            className="w-40 h-40 object-fit"
            src={c?.product?.image}
            alt={c?.product?.title}
          />
          <h1 className="text-2xl w-60 my-auto">{c?.product?.title}</h1>
        </div>

        <div className="text-center">
          <span className="text-2xl">₹ {itemTotal}</span>
        </div>

        <p className="text-2xl border py-2 px-5 rounded-xl flex gap-5">
          <button
            onClick={() => DecreaseQtyHandler(index, c)}
            className="cursor-pointer"
          >
            -
          </button>
          <span>{c?.quantity}</span>
          <button
            onClick={() => IncreaseQtyHandler(index, c)}
            className="cursor-pointer"
          >
            +
          </button>
        </p>
      </li>
    );
  });

  return (
    <div className="p-10">
      <h1 className="text-5xl mb-10"> Shopping 🛒</h1>
      <ul>{cartItems}</ul>
      <div className="mt-8 text-right text-3xl font-semibold border py-2 px-5 rounded-xl">
        Grand Total: ₹ {grandTotal}
      </div>
    </div>
  );
};

export default Cart;
