import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import UnauthWrapper from "./UnauthWrapper";

const Products = lazy(() => import("../pages/Products"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const ProductDetails = lazy(() => import("../pages/admin/ProductDetails"));
const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const AuthWrapper = lazy(() => import("./AuthWrapper"));
const Cart = lazy(() => import("../pages/Cart"));

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />

      <Route
        path="/login"
        element={
          <UnauthWrapper>
            <Login />
          </UnauthWrapper>
        }
      />
      <Route
        path="/register"
        element={
          <UnauthWrapper>
            <Register />
          </UnauthWrapper>
        }
      />

      <Route
        path="admin/create-product"
        element={
          <AuthWrapper>
            <CreateProduct />
          </AuthWrapper>
        }
      />
      <Route
        path="admin/UserProfile"
        element={
          <AuthWrapper>
            <UserProfile />
          </AuthWrapper>
        }
      />
      <Route
        path="/product/:id"
        element={
          <AuthWrapper>
            <ProductDetails />
          </AuthWrapper>
        }
      />

      <Route
        path="/cart"
        element={
          <AuthWrapper>
            <Cart />
          </AuthWrapper>
        }
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Mainroutes;
