import axios from "../../api/axiosconfig";
import { loaduser, removeuser } from "../reducers/userSlice";

export const asyncCurrentUser = () => async (dispatch, getState) => {
  try {
    const loggedinUser = JSON.parse(localStorage.getItem("user"));
    if (loggedinUser) dispatch(loaduser(loggedinUser));
    // else console.log("User Not Logged in!");
  } catch (error) {
    console.error(error);
  }
};

export const asyncLogoutUser = (user) => async (dispatch, getState) => {
  try {
    localStorage.removeItem("user");
    dispatch(removeuser());
    // console.log("User Logged Out!");
  } catch (error) {
    console.error(error);
  }
};

export const asyncLoginUser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `/users?email=${user.email}&password=${user.password}`
    );
    // console.log(data[0]);
    localStorage.setItem("user", JSON.stringify(data[0]));
    dispatch(asyncCurrentUser());
  } catch (error) {
    console.error(error);
  }
};

export const asyncRegisterUser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/users", user);
  } catch (error) {
    console.error(error);
  }
};

export const asyncUpdateUser = (id, user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.patch("/users/" + id, user);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(asyncCurrentUser());
  } catch (error) {
    console.error(error);
  }
};

export const asyncDeleteuser =
  (id) => async (dispatch, getState) => {
    try {
      await axios.delete("/users/" + id);
      dispatch(asyncLogoutUser());
    } catch (error) {
      console.error(error);
    }
  };
