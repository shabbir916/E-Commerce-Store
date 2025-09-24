import { lazy, Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UseInfiniteProducts from "../Utils/UseInfiniteProducts";
const ProductTemplate = lazy(() => import("../components/ProductTemplate"));

const Products = () => {
  const {products, hasMore, fetchProducts} = UseInfiniteProducts()

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchProducts}
      hasMore={hasMore}
      loader={<h4>Loading products...</h4>}
      endMessage={
        <p
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "2rem",
          }}
        >
          <b>Yay! You have seen all products</b>
        </p>
      }
    >
      <div className="flex flex-wrap py-10 gap-6">
        {products.map((product) => (
          <Suspense
            key={product.id}
            fallback={
              <h1 className="text-green-400 text-6xl">Loading Products...</h1>
            }
          >
            <ProductTemplate product={product} />
          </Suspense>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Products;
