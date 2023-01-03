import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../index.css";
import { logout, cekTokenExp } from "../../redux/actions/authActions";
export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(cekTokenExp());
    }
  }, [dispatch]);

  const handleLogut = async () => {
    dispatch(logout());
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light sticky-top"
        aria-label="Offcanvas navbar large"
      >
        <div className="container">
          <Link
            to="/"
            className="navbar-brand navbrand darkblue04 
                    "
          ></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar2"
            aria-controls="offcanvasNavbar2"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div
            className="offcanvas offcanvas-end bg-light w-50"
            tabIndex="-1"
            id="offcanvasNavbar2"
            aria-labelledby="offcanvasNavbar2Label"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbar2Label">
                BCR
              </h5>
              <button
                type="button"
                className="btn-close btn-close-dark"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              {!isAuthenticated ? (
                <div className="d-flex flex-grow-1 pe-3 justify-content-end">
                  <Link to="/login">
                    <button
                      type="button "
                      className="btn btn-success limegreen04 "
                      data-bs-dismiss="offcanvas"
                    >
                      Login
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <ul className="navbar-nav flex-grow-1 pe-3 justify-content-end">
                    <li className="nav-item mx-2" data-bs-dismiss="offcanvas">
                      <Link to="/myproduct" className="nav-link ">
                        My Product
                      </Link>
                    </li>
                    <li className="nav-item mx-2" data-bs-dismiss="offcanvas">
                      <Link className="nav-link ">
                        {user ? <>Hii,, {user.name}</> : <>Loading</>}
                      </Link>
                    </li>
                  </ul>
                  <Link to="/">
                    <button
                      type="button "
                      className="btn btn-success limegreen04"
                      data-bs-dismiss="offcanvas"
                      onClick={(e) => handleLogut(e)}
                    >
                      Logout
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
