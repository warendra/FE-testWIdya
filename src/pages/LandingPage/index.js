import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CarouselBanner, Navbar } from "../../component";
import { getAllProduct } from "../../redux/actions/productsActions";

export default function LandingPage() {
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <CarouselBanner />
      <div className="container">
        <div className="row">
          {product.map((product) => (
            <Card product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
