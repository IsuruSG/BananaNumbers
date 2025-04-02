import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import "./RulesDialog.css";

const RulesDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} className="rules-dialog">
      <DialogTitle className="rules-title">
        Epic Mode
        {/* <IconButton onClick={onClose} className="close-button">
          <CloseIcon />
        </IconButton> */}
      </DialogTitle>
      <DialogContent className="rules-content">
        <div className="rules-header">
          Get ready to guess numbers and score big!
        </div>

        <div className="rules-item">
          <div className="rules-icon">⏱️</div>
          <div className="rules-text">
            You have 60 seconds to play as many rounds as possible
          </div>
        </div>

        <div className="rules-item">
          <div className="rules-icon">❤️</div>
          <div className="rules-text">Each round gives you 3 lives</div>
        </div>

        <div className="rules-section-title">
          Score points based on attempts:
        </div>

        <div className="rules-points">
          <div className="rules-point">
            <span className="point-value">+30</span>
            <span className="point-label">1st attempt</span>
          </div>
          <div className="rules-point">
            <span className="point-value">+20</span>
            <span className="point-label">2nd attempt</span>
          </div>
          <div className="rules-point">
            <span className="point-value">+10</span>
            <span className="point-label">3rd attempt</span>
          </div>
        </div>

        <div className="rules-footer">
          The game ends if you run out of lives or time
        </div>

        <button className="rules-close-btn" onClick={onClose}>
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default RulesDialog;
