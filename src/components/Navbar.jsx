import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Navbar({ darkMode, setDarkMode }) {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("email");
    navigate("/login");
  };
  return (
    <AppBar position="sticky" sx={{ mb: 5 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ mr: "auto" }}>
          Notes App
        </Typography>
        {darkMode ? (
          <Tooltip title="Light mode">
            <IconButton aria-label="light-mode" onClick={handleDarkMode}>
              <LightModeIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Dark mode">
            <IconButton aria-label="dark-mode" onClick={handleDarkMode}>
              <DarkModeIcon />
            </IconButton>
          </Tooltip>
        )}

        {localStorage.getItem("uid") === null ? (
          <Button onClick={handleClick} color="inherit">
            Login
          </Button>
        ) : (
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
