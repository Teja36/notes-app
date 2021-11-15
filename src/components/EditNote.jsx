import React, { useState, useRef } from "react";
import { updateNote } from "../firebase";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

export default function FormDialog({ id, title, desc }) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({ title, desc });
  const [error, setError] = useState("");
  const titleRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValues({ title, desc });
    setError("");
  };

  const handleSubmit = () => {
    if (values.title) {
      updateNote(id, values.title, values.desc);
      setOpen(false);
      setError("");
    } else {
      setError("Title can't be empty!");
      titleRef.current.focus();
    }
  };
  return (
    <>
      <Button color="primary" startIcon={<EditIcon />} onClick={handleOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent>
          <DialogTitle>Edit Note</DialogTitle>
          <TextField
            autoFocus
            type="text"
            label="Title"
            value={values.title}
            onChange={(e) => {
              setValues({ ...values, title: e.target.value });
            }}
            variant="standard"
            margin="dense"
            inputRef={titleRef}
            error={error.length ? true : false}
            helperText={error}
            required
            fullWidth
          />
          <TextField
            type="text"
            label="Description"
            value={values.desc}
            onChange={(e) => {
              setValues({ ...values, desc: e.target.value });
            }}
            variant="standard"
            margin="dense"
            multiline
            minRows={4}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Confirm</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
