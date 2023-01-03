import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Card } from "../../component";
import { Container, Row, Col, Table } from "react-bootstrap";
import AddProduct from "../../images/addProduct.png";
import { getAllProductByIdSeller } from "../../redux/actions/productsActions";

export default function MyProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    if (token === null) {
      return navigate("/");
    }
    dispatch(getAllProductByIdSeller());
  }, [dispatch, navigate, token]);
  return (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col lg={3} md={12} xs={12}>
            <div className="boxShadow mt-4">
              <h5>Kategori</h5>

              <Table style={{ color: "grey" }}>
                <thead>
                  <tr
                    style={{ height: "50px" }}
                    className="kategoriActive"
                    id="filterAll"
                    // onClick={handleFilterSemua}
                  >
                    <td>
                      <i className="bi bi-box me-2"></i>Semua Produk
                      <i className="bi bi-chevron-right float-end"></i>
                    </td>
                  </tr>
                  <tr
                    style={{ height: "50px" }}
                    className="kategoriInActive"
                    id="filterDiminati"
                    // onClick={handleFilterDiminati}
                  >
                    <td>
                      <i className="bi bi-heart me-2"></i>Diminati
                      <i className="bi bi-chevron-right float-end"></i>
                    </td>
                  </tr>
                  <tr
                    style={{ height: "50px" }}
                    className="kategoriInActive"
                    id="filterTerjual"
                    // onClick={handleFilterTerjual}
                  >
                    <td>
                      <i className="bi bi-currency-dollar me-2"></i>Terjual
                      <i className="bi bi-chevron-right float-end"></i>
                    </td>
                  </tr>
                </thead>
              </Table>
            </div>
          </Col>
          <Col lg={9} md={12} xs={12}>
            <Row className="mt-4">
              <Col lg={4} md={4} xs={6} className="mb-4">
                <Link to={`/createproduct`}>
                  <img src={AddProduct} className="imgBtnAdd" alt="" />
                </Link>
              </Col>
              {product.map((product) => (
                <Card product={product} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
