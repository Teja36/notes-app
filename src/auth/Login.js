import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Box,
  Typography,
  TextField,
  FormHelperText,
  Button,
} from "@mui/material";

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        emailRef.current.value = "";
        passwordRef.current.value = "";

        localStorage.setItem("uid", user.uid);
        localStorage.setItem("email", user.email);
        navigate("/");
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          setError("Invalid email or password.");
          emailRef.current.focus();
        }
        if (err.code === "auth/wrong-password") {
          setError("Password is incorrect.");
          passwordRef.current.focus();
        }
        if (err.code === "auth/user-not-found") {
          setError("User not found.");
          emailRef.current.focus();
        }
        console.log(err.code);
      });
    passwordRef.current.value = "";
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="90vh"
    >
      <form onSubmit={handleSubmit} noValidate>
        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          Login
        </Typography>

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
          inputRef={passwordRef}
          variant="outlined"
          label="Password"
          margin="normal"
          required
        />

        <FormHelperText error sx={{ my: 2 }}>
          {error}
        </FormHelperText>
        <Button type="submit" variant="contained" color="primary" size="large">
          Log In
        </Button>
        <FormHelperText sx={{ mt: 2 }}>
          Don't have an account? Sign up{" "}
          <Link to="/sign-up" style={{ textDecoration: "none" }}>
            here.
          </Link>
        </FormHelperText>
      </form>
    </Box>
  );
}
