import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  open,
  handleClose,
  handleStartNewGame,
  alertTitle,
  alertDescription,
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
        {alertDescription && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {alertDescription}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleStartNewGame}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
