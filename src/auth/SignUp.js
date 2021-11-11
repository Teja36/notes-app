import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./style.css";
import {
  Box,
  Typography,
  TextField,
  FormHelperText,
  Button,
} from "@mui/material";

export default function SignUp() {
  const unameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const passconfRef = useRef(null);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  function validateInput() {
    if (passRef.current.value !== passconfRef.current.value) {
      alert("passwords didnt match");
    }
  }

  function resetForm() {
    unameRef.current.value = "";
    emailRef.current.value = "";
    passRef.current.value = "";
    passconfRef.current.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    validateInput();
    createUser();
  }

  function createUser() {
    const uname = unameRef.current.value;
    const email = emailRef.current.value;
    const pass = passRef.current.value;

    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("email", user.email);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        setErr(errorCode);
      });
    resetForm();
  }
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <form onSubmit={handleSubmit} noValidate>
        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          Sign Up
        </Typography>

        <TextField
          type="email"
          inputRef={unameRef}
          variant="outlined"
          label="Username"
          margin="normal"
          required
        />
        <TextField
          type="email"
          inputRef={emailRef}
          variant="outlined"
          label="Email"
          margin="normal"
          required
        />
        <TextField
          type="password"
          inputRef={passRef}
          variant="outlined"
          label="Password"
          margin="normal"
          required
        />
        <TextField
          type="password"
          inputRef={passconfRef}
          variant="outlined"
          label="Confirm password"
          margin="normal"
          required
        />

        <FormHelperText error sx={{ my: 2 }}>
          {err}
        </FormHelperText>
        <Button type="submit" variant="contained" color="primary" size="large">
          Sign Up
        </Button>
        <FormHelperText sx={{ mt: 2 }}>
          Already have an account? Sign in{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            here.
          </Link>
        </FormHelperText>
      </form>
    </Box>
  );
}
