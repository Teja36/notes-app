import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { db } from "../firebase";
import { collection, where, query, getDocs } from "firebase/firestore";

import Navbar from "./Navbar";
import NoteCard from "./NoteCard";
import AddNote from "./AddNote";

export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const uid = localStorage.getItem("uid");

  const getNotes = async () => {
    const q = query(collection(db, "notes"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    const tempDoc = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        title: doc.data().title,
        desc: doc.data().description,
      };
    });
    console.log(tempDoc);
    setNotes(tempDoc);
  };

  return (
    <>
      <Navbar />
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
                    notify={getNotes}
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
        <AddNote notify={getNotes} />
      </Container>
    </>
  );
}
