import React, { useState, useRef } from "react";
import { addNotes } from "../firebase";
import {
  Button,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const uid = localStorage.getItem("uid");
    const title = titleRef.current.value;
    const desc = descRef.current.value;

    if (uid) addNotes(uid, title, desc);

    handleClose();
  };
  return (
    <>
      <Fab
        onClick={handleOpen}
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 25, right: 25 }}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent>
          <DialogTitle>Add Note</DialogTitle>
          <TextField
            autoFocus
            type="text"
            label="Title"
            inputRef={titleRef}
            variant="standard"
            margin="dense"
            fullWidth
          />
          <TextField
            type="text"
            label="Description"
            inputRef={descRef}
            variant="standard"
            margin="dense"
            multiline
            minRows={4}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
