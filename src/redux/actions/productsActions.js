import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_ALL_PRODUCT,
  GET_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  CLEAR_PRODUCT,
  PRODUCT_ERROR,
  DELETE_PRODUCT,
} from "./types";

// Di Halaman Landing Page
export const getAllProduct = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:1500/product");
    const data = response.data;
    // console.log(data);
    dispatch({
      type: GET_ALL_PRODUCT,
      product: data.data,
      status: "OK",
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.msg,
    });
  }
};
export const getProductById = (id) => async (dispatch) => {
  try {
    // const res = await fetch(
    //   `https://be-final-project-binar.herokuapp.com/api/v1/product/${id}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   }
    // );

    const response = await axios.get(`http://localhost:1500/product/${id}`);
    // console.log(response.data);
    const data = response.data;
    dispatch({
      type: GET_PRODUCT,
      detailproduct: data.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: err.response.data.msg,
    });
  }
};
export const updateProduct = (params) => async (dispatch) => {
  try {
    // console.log("updateproduk");
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    // console.log(params.file);
    var formdata = new FormData();
    formdata.append("productName", params.product_name);
    formdata.append("price", params.price);
    formdata.append("category", params.category);
    formdata.append("description", params.description);
    formdata.append("picture", params.file);

    const response = await axios.put(
      `http://localhost:1500/product/${params.id}`,
      formdata,
      config
    );
    console.log(response);
    const data = response.data;
    console.log(data.message);
    dispatch({
      type: UPDATE_PRODUCT,
      status: data.message,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Success",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: error.response,
    });

    Swal.fire({
      position: "center",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
// Di Halaman Daftar Jual
export const addProduct = (params) => async (dispatch) => {
  try {
    console.log(params);
    var formdata = new FormData();
    formdata.append("productName", params.product_name);
    formdata.append("price", params.price);
    formdata.append("category", params.category);
    formdata.append("description", params.description);
    formdata.append("picture", params.file);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `http://localhost:1500/product`,
      formdata,
      config
    );
    const data = response.data;
    console.log(response);
    // console.log("ini" + JSON.stringify(data));
    dispatch({
      type: CREATE_PRODUCT,
      status: data.message,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Success",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: error.response,
    });

    Swal.fire({
      position: "center",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const getAllProductByIdSeller = () => async (dispatch) => {
  try {
    // const response = await fetch(`http://localhost:1500/productbyseller`, {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // });
    const response = await axios.get("http://localhost:1500/productbyseller", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = response.data;

    dispatch({
      type: GET_ALL_PRODUCT,
      product: data.data,
      status: "ID_SELLER",
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: error.response,
    });
    Swal.fire({
      position: "center",
      icon: "error",
      title: error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`http://localhost:1500/product/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = response.data;
    dispatch({
      type: DELETE_PRODUCT,
      payload: data.message,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Delete success",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: error,
    });

    Swal.fire({
      position: "center",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
export const updateStatusProduct = (id) => async (dispatch) => {
  try {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // };
    const response = await fetch(`http://localhost:1500/product/status/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // const response = await axios.put(`http://localhost:1500/product/status/7`, {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // });
    // console.log(response.text());
    const data = await response.json();
    console.log(data);
    dispatch({
      type: UPDATE_PRODUCT,
      payload: data.message,
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "update success",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_ERROR,
      payload: error,
    });

    Swal.fire({
      position: "center",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const clearProduct = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PRODUCT,
  });
};
