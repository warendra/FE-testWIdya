import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  updateProduct,
  getProductById,
} from "../../redux/actions/productsActions";
import Swal from "sweetalert2";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import fi_plus from "../../images/fi_plus.png";
import { Navbar } from "../../component";

export default function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { status, detailProduct } = useSelector((state) => state.product);
  const [product_name, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    dispatch(getProductById(id));
    if (!detailProduct) {
      alert("eror");
    }
    if (detailProduct) {
      setProductName(detailProduct.productName);
      setPrice(detailProduct.price);
      setCategory(detailProduct.category);
      setDescription(detailProduct.description);
      setFile(detailProduct.image);
    }
  }, [dispatch, id]);
  if (localStorage.getItem("token") === null) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Harap Login Terlebih Dahulu",
      showConfirmButton: false,
      timer: 1000,
    });
    return <Navigate to="/login" />;
  }

  const handleSubmit = async () => {
    let data = { id, product_name, price, category, description, file };

    dispatch(updateProduct(data));

    Swal.fire({
      position: "center",
      title: "Loading...",
      showConfirmButton: false,
      timer: 10500,
    });
  };

  if (status === "Update car success") {
    navigate(`/detailproduct/${id}`);
  }
  return (
    <>
      <Navbar />
      <section className="container my-5">
        <form style={{ maxWidth: "800px" }} className="mx-auto">
          <div>
            <div className="mb-3">
              <label htmlFor="namaproduk" className="form-label">
                Nama Produk<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="namaproduk"
                placeholder="Nama Produk"
                required
                value={product_name}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="harga" className="form-label">
                Harga Produk<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                min="1"
                step="any"
                className="form-control"
                id="harga"
                placeholder="Rp 0,00"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="namaproduk" className="form-label">
                Kategori<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="namaproduk"
                placeholder="kategori"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deskripsi" className="form-label">
                Deskripsi<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="deskripsi"
                placeholder="contoh: Jalan Ikan Hiu 33"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="deskripsi" className="form-label">
                Foto Produk<span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <div className="row">
                  <div className="col-md-3">
                    <label>
                      {file ? (
                        <img src={file} style={{ width: "90px" }} alt="" />
                      ) : (
                        <img
                          src={fi_plus}
                          alt=""
                          style={{
                            borderStyle: "dashed",
                            padding: "34px",
                            borderRadius: "12px",
                            width: "96px",
                            borderColor: "#d0d0d0",
                          }}
                        />
                      )}
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        placeholder="Upload Image"
                        onChange={(e) => setFile(e.target.files[0])}
                        multiple
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      borderRadius: "16px",
                      color: "black",
                      borderColor: "#7126B5",
                    }}
                  >
                    Preview
                  </button>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      backgroundColor: "#7126B5",
                      borderRadius: "16px",
                    }}
                  >
                    Terbitkan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
