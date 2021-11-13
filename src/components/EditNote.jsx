import React, { useState } from "react";
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (values.title) updateNote(id, values.title, values.desc);

    handleClose();
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
