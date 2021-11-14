import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { db } from "../firebase";
import { collection, where, query, onSnapshot } from "firebase/firestore";

import Navbar from "./Navbar";
import NoteCard from "./NoteCard";
import AddNote from "./AddNote";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const uid = localStorage.getItem("uid");
  const q = query(collection(db, "notes"), where("userId", "==", uid));

  useEffect(
    () =>
      onSnapshot(q, (snapshot) => {
        setNotes(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            desc: doc.data().description,
          }))
        );
        console.log("snapshot");
      }),
    []
  );

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Paper style={{ height: "100vh" }}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Container>
          <Grid container spacing={3}>
            {notes.length > 0 ? (
              notes.map((data) => {
                return (
                  <Grid item md={4} sm={6} xs={12} key={data.id}>
                    <NoteCard
                      id={data.id}
                      title={data.title}
                      desc={data.desc}
                    />
                  </Grid>
                );
              })
            ) : (
              <Typography
                variant="h1"
                component="p"
                sx={{ textAlign: "center", flexGrow: 1, color: "#9e9e9e" }}
              >
                Start adding your notes here.
              </Typography>
            )}
          </Grid>
          <AddNote />
        </Container>
      </Paper>
    </ThemeProvider>
  );
}
