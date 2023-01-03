import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/actions/productsActions";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import fi_plus from "../../images/fi_plus.png";
import { Navbar } from "../../component";
import CurrencyInput from "react-currency-input-field";

export default function FormProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const { status } = useSelector((state) => state.product);

  const [product_name, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading..",

      timer: 20000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {},
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });
    const data = { product_name, price, category, description, file };
    dispatch(addProduct(data));
  };
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

  if (status === "Product Created ") {
    navigate("/myproduct");
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
              <CurrencyInput
                id="harga"
                name="harga"
                placeholder="Rp 0,00"
                defaultValue={price}
                onValueChange={(value) => setPrice(value)}
                prefix={"Rp"}
                decimalSeparator=","
                groupSeparator="."
                className="form-control"
                required
                allowDecimals={false}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deskripsi" className="form-label">
                Kategori<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="deskripsi"
                placeholder="contoh: Jalan Ikan Hiu 33"
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
                        <img src={file} alt="" />
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
