import { useEffect, useState } from "react";
import { loadlazyProduct } from "../store/reducers/productSlice";
import axios from "../api/axiosconfig";
import { useDispatch, useSelector } from "react-redux";

const UseInfiniteProducts = () => {
  const { products } = useSelector((state) => state.product);
  const [hasMore, sethasMore] = useState(true);
  const LIMIT = 3;

  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `/products?_limit=${LIMIT}&_start=${products.length}`
      );
      if (data.length === 0 || data.length < LIMIT) {
        sethasMore(false);
      } else {
        dispatch(loadlazyProduct(data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {products, hasMore, fetchProducts};
};

export default UseInfiniteProducts;
