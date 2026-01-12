import { useEffect } from "react";
import bgImg from "./assets/e-com-bg.jpeg";
import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";
import { asyncCurrentUser } from "./store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    !users && dispatch(asyncCurrentUser());
  }, [users]);

  // useEffect(() => {
  //   products.length == 0 && dispatch(asyncLoadProduct());
  // }, [products]);

  //  useEffect(() => {
  //    dispatch(asyncLoadProduct());
  //    dispatch(asyncCurrentUser())
  // }, []);

  return (
    <div
      className="min-h-screen w-screen flex items-center flex-col inset-0 bg-cover bg-center text-white py-10"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="relative nav w-content mb-10 py-2 px-5 bg-transparent backdrop-blur-sm rounded-2xl border border-white/20">
        <Nav />
      </div>
      <div className="relative main w-11/12 h-5/6 bg-transparent backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 flex flex-col">
        <Mainroutes />
      </div>
    </div>
  );
};

export default App;
