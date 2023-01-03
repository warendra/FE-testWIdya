import Swal from "sweetalert2";
import axios from "axios";
import {
  AUTH_ERROR,
  LOGIN,
  REGISTER,
  CLEAR,
  LOGOUT,
} from "./types";

export const regis = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://be-testwidya-production.up.railway.app/auth/register",
      data
    );

    const result = response.data;


    if (response.status === 201) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }

    dispatch({
      type: REGISTER,
      status: result.message,
    });
  } catch (error) {
    authError(error);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Registration Failed",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const clear = () => async (dispatch) => {
  dispatch({
    type: CLEAR,
  });
};

const authError = (error) => async (dispatch) => {
  dispatch({
    type: AUTH_ERROR,
    payload: error.message,
  });

  setTimeout(() => {
    dispatch({
      type: AUTH_ERROR,
      payload: null,
    });
  }, 5000);
};

export const login = (data) => async (dispatch) => {
  try {

    const response = await axios.post("https://be-testwidya-production.up.railway.app/auth/login", data);

    const result = response.data;

    if (result.data.token) {
      dispatch({
        type: LOGIN,
        token: result.data.token,
        status: result.message,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      authError(result.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  } catch (error) {
    authError(error);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Email or Password is incorrect",
      showConfirmButton: false,
      timer: 1000,
    });
  }
};

export const cekTokenExp = () => async (dispatch) => {
  try {
    
    const response = await axios.get("https://be-testwidya-production.up.railway.app/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = response.data;
    
    if (response.status === 401) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch({
        type: LOGOUT,
      });
    } else {
      dispatch({
        type: LOGIN,
        token: localStorage.getItem("token"),
        status: result.message,
        user: result.data.user,
      });
    }
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Session Expired, Please Login Again",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch({
      type: LOGOUT,
    });
  }
};
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  Swal.fire({
    position: "center",
    icon: "info",
    title: "Logout Successful",
    showConfirmButton: false,
    timer: 1500,
  });
};






