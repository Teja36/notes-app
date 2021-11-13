import React from "react";
import { deleteNote } from "../firebase";
import EditNote from "./EditNote";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function NoteCard({ id, title, desc }) {
  const handleDelete = () => {
    deleteNote(id);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{desc}</Typography>
      </CardContent>
      <CardActions>
        <EditNote id={id} title={title} desc={desc} />
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
