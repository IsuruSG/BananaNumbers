import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./Leaderboard.css";
import roundTrophyIcon from "../../assets/roundTrophy.svg";
import goldmedalIcon from "../../assets/goldmedal.svg";
import silvermedalIcon from "../../assets/silvermedal.svg";
import bronzemedalIcon from "../../assets/bronzemedal.svg";

const Leaderboard = ({ open, onClose, data }) => {
  const leaderboardData = data;

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <img src={goldmedalIcon} className="medal" />;
      case 2:
        return <img src={silvermedalIcon} className="medal" />;
      case 3:
        return <img src={bronzemedalIcon} className="medal" />;
      default:
        return rank;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="leaderboard-dialog"
      PaperProps={{ className: "leaderboard-paper" }}>
      <div className="trophy-container">
        <img src={roundTrophyIcon} alt="Trophy" className="round-trophy-icon" />
      </div>
      <div className="leaderboard-title">Leaderboard</div>
      <div className="leaderboard-description">Top 10 Banana Guessers</div>
      <DialogContent className="leaderboard-dialog-content">
        <TableContainer
          component={Paper}
          className="leaderboard-table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Player</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="leaderboard-table-body">
              {leaderboardData.map((row) => (
                <TableRow
                  key={row.rank}
                  className={row.isCurrentUser ? "current-user-row" : ""}>
                  <TableCell>{getRankIcon(row.rank)}</TableCell>
                  <TableCell>{row.player}</TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <button className="leaderboard-close-btn" onClick={onClose}>
        Close
      </button>
    </Dialog>
  );
};

export default Leaderboard;
