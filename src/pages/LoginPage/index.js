import React, { useState, useEffect } from "react";
import { Form, Button, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login, clear } from "../../redux/actions/authActions";
import Swal from "sweetalert2";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (error) {
      alert(error);
    }
    dispatch(clear());
  }, [dispatch, error]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (email === "") {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Harap isi email anda",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    if (password === "") {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Harap isi password anda",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    dispatch(login({ email, password }));
  };
  if (status === "User berhasil login") {
    return <Navigate to={`/`} />;
  }
  return (
    <>
      <div className="d-flex w-100 h-100 justify-content-center align-items-center">
        <Form className="formAuth w-25 ">
          <h3 className="fw-bold mb-3">Masuk</h3>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="formLabel">Email</Form.Label>
            <Form.Control
              type="email"
              className="formInput"
              placeholder="Contoh: johndee@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="formLabel">Password</Form.Label>
            <Form.Control
              type="password"
              className="formInput"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            type="button"
            className="btn-block w-100 mb-3 btnPrimary"
            onClick={(e) => handleSubmitLogin(e)}
          >
            Masuk
          </Button>
          {/* <div className={{ marginTop: "20px" }}>
          <p>
            {" "}
            Lupa Password ?{" "}
            <Link
              to="/lupa-password"
              style={{ color: "#4b1979", fontWeight: "normal" }}
            >
              Klik disini
            </Link>
          </p>
        </div> */}
          {/* <div className="d-flex justify-content-center">
          <Button
            variant="success"
            className="mb-3"
            style={{
              height: "40px",
              color: "black",
              backgroundColor: "white",
            }}
            onClick={() => googleLogin()}
          >
            <div className="d-flex justify-content-center">
              <img
                src={GoogleImg}
                width={25}
                height={25}
                style={{ marginRight: "10px" }}
                alt=""
              />
              <p>Masuk dengan Google</p>
            </div>
          </Button>
        </div> */}
          <div className="mt-3 d-flex justify-content-center">
            <Stack direction="horizontal" gap={1}>
              <p>Belum punya akun?</p>
              <Link to="/register">
                <p style={{ color: "#4b1979", fontWeight: "bold" }}>
                  Daftar di sini
                </p>
              </Link>
            </Stack>
          </div>
        </Form>
      </div>
    </>
  );
}
