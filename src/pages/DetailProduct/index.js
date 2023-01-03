import { Carousel } from "react-bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  deleteProduct,
  getProductById,
  updateStatusProduct,
} from "../../redux/actions/productsActions";
import { Navbar } from "../../component";

export default function DetailProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { detailProduct, status } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, status, id]);

  useEffect(() => {});

  const handleDestroy = async () => {
    dispatch(deleteProduct(id));
  };

  const handleTerjual = async () => {
    dispatch(updateStatusProduct(id));
  };
  if (status === "Delete product success") {
    navigate("/myproduct");
  }
  if (status === "update status product success") {
    navigate("/myproduct");
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="container mt-5">
        <div className="row mx-auto mb-3">
          <div className="col-xl-6 col-sm-12">
            <Carousel className="boxCarousel">
              <Carousel.Item>
                <img
                  className="d-block w-100 boxImagePreview buttonradius20"
                  src={detailProduct.image}
                  alt="First slide"
                />
              </Carousel.Item>
            </Carousel>

            <div className="des boxShadow mt-4">
              <h6 className="">Deskripsi</h6>
              <p>{detailProduct.description}</p>
            </div>
          </div>
          <div className="col-xl-4 col-sm-12">
            <div className="card cardProduct p-3 mt-1 boxShadow mb-2">
              <h6 className="card-title " style={{ fontSize: "26px" }}>
                {detailProduct.productName}
              </h6>
              <p style={{ fontSize: "12px" }}>{detailProduct.category}</p>
              <p style={{ fontSize: "16px" }}>Rp {detailProduct.price}</p>

              {!user ? (
                <>
                  <button
                    className="btn btn-outline-success mb-2 "
                    // onClick={() => handleEdit(detailProduct.id)}
                  >
                    {" "}
                    Beli Via WA
                  </button>
                </>
              ) : user.id === detailProduct.idSeller ? (
                <>
                  {detailProduct.status !== "notAvailable" ? (
                    <>
                      <Link to={`/editproduct/${id}`} className="w-100">
                        <button
                          className="btn btn-outline-success mb-2 w-100 "
                          // onClick={() => handleEdit(detailProduct.id)}
                        >
                          {" "}
                          Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-outline-danger mb-2 "
                        onClick={() => handleDestroy()}
                      >
                        {" "}
                        Hapus
                      </button>

                      <button
                        className="btn btn-outline-success mb-2 "
                        onClick={() => handleTerjual()}
                      >
                        {" "}
                        Terjual
                      </button>
                    </>
                  ) : (
                    <>
                      <div>
                        <h4>Terjual</h4>
                      </div>
                      <div className="w-100">
                        <button
                          className="btn btn-outline-success mb-2 w-100 "
                          disabled
                          // onClick={() => handleEdit(detailProduct.id)}
                        >
                          {" "}
                          Edit
                        </button>
                      </div>
                      <button
                        className="btn btn-outline-danger mb-2 "
                        disabled
                        onClick={() => handleDestroy()}
                      >
                        {" "}
                        Hapus
                      </button>

                      <button
                        className="btn btn-outline-success mb-2 "
                        disabled
                        onClick={() => handleTerjual()}
                      >
                        {" "}
                        Terjual
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <button
                    className="btn btn-outline-success mb-2 "
                    // onClick={() => handleEdit(detailProduct.id)}
                  >
                    {" "}
                    Beli Via WA
                  </button>
                </>
              )}
            </div>
            {/* <div className="card infoSeller">
              <div className="row">
                <div className="col-2">a</div>
                <div className="col-10">
                  <h6>{detailUser.name}</h6>
                  <p>{detailUser.city}</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
