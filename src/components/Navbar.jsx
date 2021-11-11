import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("email");
    navigate("/login");
  };
  return (
    <AppBar position="sticky" sx={{ mb: 5 }}>
      <Toolbar>
        <Typography variant="h6">Notes App</Typography>
        {localStorage.getItem("uid") === null ? (
          <Button onClick={handleClick} color="inherit" sx={{ ml: "auto" }}>
            Login
          </Button>
        ) : (
          <Button onClick={handleLogout} color="inherit" sx={{ ml: "auto" }}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
