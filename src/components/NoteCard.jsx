import React from "react";
import { deleteNote } from "../firebase";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function NoteCard({ id, title, desc, notify }) {
  const handleDelete = () => {
    deleteNote(id);
    notify();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{desc}</Typography>
      </CardContent>
      <CardActions>
        {/* <Button color="primary" startIcon={<EditIcon />}>
          Edit
        </Button> */}
        <Button
          color="primary"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
