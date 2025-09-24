import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const user = useSelector((state) => state.user.users);

  // console.log(user);

  return (
    <nav className="flex justify-center items-center gap-10 text-[1.2rem]">
      <NavLink to="/">Home</NavLink>

      {user ? (
        <>
          {user.isAdmin && (
            <NavLink to="/admin/create-product">Create Products</NavLink>
          )}

          <NavLink to="/admin/UserProfile">Settings</NavLink>
          <NavLink to="/cart">cart</NavLink>
        </>
      ) : (
        <>
          <NavLink
            className="border py-1 px-4 rounded-md cursor-pointer hover:bg-white/80 hover:text-black"
            to="/login"
          >
            Login
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Nav;
