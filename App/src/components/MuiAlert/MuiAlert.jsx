import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  open,
  handleClose,
  handleStartNewGame,
  alertTitle,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        aria-labelledby="alert-dialog-title"
        disableEscapeKeyDown>
        <DialogTitle id="alert-dialog-title">{alertTitle}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleStartNewGame}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
