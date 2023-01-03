import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { regis, clear } from "../../redux/actions/authActions";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { isAuthenticated, status, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (error) {
      alert(error);
    }
    dispatch(clear());
  }, [dispatch, error]);

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (name === "") {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Harap isi nama anda",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
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
    if (gender === "") {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Harap isi jenis kelamin anda",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    dispatch(regis({ email, name, password, gender }));
  };
  if (status === "Berhasil mendaftarkan user") {
    return <Navigate to={`/login`} />;
  }

  return (
    <>
      <div className="d-flex w-100 h-100 justify-content-center align-items-center">
        <Form className="formAuth w-25">
          <h3 className="fw-bold mb-3">Daftar</h3>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label className="formLabel">Nama</Form.Label>
            <Form.Control
              type="text"
              className="formInput"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="gender">
            <Form.Label className="formLabel">Jenis Kelamin</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Choose one</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </Form.Select>
          </Form.Group>

          <Button
            type="button"
            className="btn-block w-100 mb-3 btnPrimary"
            onClick={(e) => handleSubmitRegister(e)}
          >
            Daftar
          </Button>
          <div className="mt-3 d-flex justify-content-center">
            <Stack direction="horizontal" gap={1}>
              <p>Sudah punya akun?</p>
              <Link to="/login">
                <p style={{ color: "#4b1979", fontWeight: "bold" }}>
                  Masuk di sini
                </p>
              </Link>
            </Stack>
          </div>
        </Form>
      </div>
    </>
  );
}
