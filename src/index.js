import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";

// import LandingPage from "./pages/landingPage";
import {
  LoginPage,
  LandingPage,
  RegisterPage,
  MyProduct,
  DetailProduct,
  EditProduct,
  FormProduct,
} from "./pages";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/myproduct" element={<MyProduct />} />
        <Route path="/detailproduct/:id" element={<DetailProduct />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
        <Route path="/createproduct" element={<FormProduct />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
