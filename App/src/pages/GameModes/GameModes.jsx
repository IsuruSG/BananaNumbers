import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../../../Layout/Layout";
import infinityIcon from "../../assets/infinityIcon.svg";
import clockIcon from "../../assets/time.svg";
import trophyIcon from "../../assets/trophy.svg";
import gameIcon from "../../assets/gamepad.svg";
import starIcon from "../../assets/star.svg";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import UserMenu from "../../components/UserMenu/UserMenu";
import BackButton from "../../components/BackButton/BackButton";
import "./GameModes.css";
import api from "../../utils/api";

function GameModes() {
  const navigate = useNavigate();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [gameStats, setGameStats] = useState({
    highScore: 0,
    gamesPlayed: 0,
    highestRounds: 0,
  });
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!localStorage.getItem("jwtToken");

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserStats();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await api.get("/Game/getUserStats");

      setGameStats({
        highScore: response.data.highScore || 0,
        gamesPlayed: response.data.gamesPlayed || 0,
        highestRounds: response.data.highestRounds || 0,
      });
    } catch (error) {
      console.error("Error fetching game stats:", error);
      // Set default values if there's an error
      setGameStats({
        highScore: 0,
        gamesPlayed: 0,
        highestRounds: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlayClassic = () => {
    navigate("/classic-mode");
  };

  const handlePlayEpic = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate("/epic-mode");
    } else {
      setOpenLoginDialog(true);
    }
  };

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  const handleNavigateToLogin = () => {
    setOpenLoginDialog(false);
    navigate("/sign-in", { state: { from: "/epic-mode" } });
  };

  return (
    <Layout>
      {isLoggedIn ? (
        <div className="nav-control right">
          <UserMenu />
        </div>
      ) : (
        <div className="nav-control left">
          <BackButton />
        </div>
      )}
      <div className="game-modes-container">
        <h1 className="game-title">Banana Numbers</h1>
        <p className="game-description">
          Choose your game mode and start guessing!
        </p>

        <div className="game-modes-div">
          {/* Classic Mode Card */}
          <div className="game-mode-card">
            <img src={infinityIcon} alt="Infinity Icon" className="mode-icon" />
            <h2 className="mode-title">Classic Mode</h2>
            <p className="mode-description">
              Try to guess it correctly. No pressure, just fun!
            </p>
            <button
              className="play-button"
              style={{ backgroundColor: "#F59E0B" }}
              onClick={handlePlayClassic}>
              Play Classic
            </button>
          </div>

          {/* Epic Mode Card */}
          <div className="game-mode-card">
            <img src={clockIcon} alt="Clock Icon" className="mode-icon" />
            <h2 className="mode-title">Epic Mode</h2>
            <p className="mode-description">
              Race against the clock. Guess as much as you can before time runs
              out!
            </p>
            <button
              className="play-button"
              style={{
                backgroundColor: "#F97316",
                opacity: isLoggedIn ? 1 : 0.7,
                cursor: "pointer",
              }}
              onClick={handlePlayEpic}>
              {isLoggedIn ? "Play Epic" : "Sign In to Play"}
            </button>
          </div>
        </div>

        {/* Stats Section */}
        {isLoggedIn && !loading && (
          <div className="stats">
            <div className="stat-card">
              <img src={trophyIcon} alt="Trophy Icon" className="trophy-icon" />
              <p className="stat-type">High Score</p>
              <p className="stat">{gameStats.highScore}</p>
            </div>
            <div className="stat-card">
              <img src={gameIcon} alt="Game Icon" className="game-icon" />
              <p className="stat-type">Games Played</p>
              <p className="stat">{gameStats.gamesPlayed}</p>
            </div>
            <div className="stat-card">
              <img src={starIcon} alt="Star Icon" className="star-icon" />
              <p className="stat-type">Highest Rounds</p>
              <p className="stat">{gameStats.highestRounds}</p>
            </div>
          </div>
        )}

        {/* Login Dialog */}
        <Dialog open={openLoginDialog} onClose={handleCloseLoginDialog}>
          <DialogTitle>Login Required</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You need to sign in to play Epic Mode and track your high scores!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLoginDialog}>Cancel</Button>
            <Button
              onClick={handleNavigateToLogin}
              color="primary"
              variant="contained">
              Sign In
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Layout>
  );
}

export default GameModes;
