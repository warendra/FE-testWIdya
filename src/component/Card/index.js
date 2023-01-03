import React from "react";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  function rupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  }
  return (
    <>
      <div key={product.id} className="col-md-4 col-xl-3 col-sm-12">
        <Link
          to={`/detailproduct/${product.id}`}
          className="text-decoration-none"
          style={{ color: "black" }}
        >
          <div
            className="card cardProduct boxShadow"
            style={{ border: "none" }}
          >
            <div className="d-flex justify-content-center ">
              <img
                className="card-img-top center-cropped m-1 img-fluid"
                src={product.image}
                style={{
                  width: "200px",
                  height: "100px",
                  objectFit: "cover",
                }}
                alt="product_image"
              />
            </div>
            <div className="card-body">
              <h6
                className="card-title text-decoration-none"
                style={{ fontSize: "16px" }}
              >
                {product.productName}
              </h6>
              <p className="text-decoration-none" style={{ fontSize: "14px" }}>
                {product.category}
              </p>
              <p className="text-decoration-none" style={{ fontSize: "16px" }}>
                {rupiah(product.price)}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
