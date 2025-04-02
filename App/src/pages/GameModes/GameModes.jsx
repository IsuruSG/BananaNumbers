import React from "react";
import { useNavigate } from "react-router";
import Layout from "../../../Layout/Layout";
import infinityIcon from "../../assets/infinityIcon.svg";
import clockIcon from "../../assets/time.svg";
import trophyIcon from "../../assets/trophy.svg";
import gameIcon from "../../assets/gamepad.svg";
import starIcon from "../../assets/star.svg";
import "./GameModes.css";

function GameModes() {
  const navigate = useNavigate();

  const handlePlayClassic = () => {
    navigate("/classic-mode");
  };

  const handlePlayEpic = () => {
    navigate("/epic-mode");
  };

  return (
    <Layout>
      <div>
        <h1 className="game-title">Banana Numbers</h1>
        <p className="game-description">
          Choose your game mode and start guessing!
        </p>

        <div className="game-modes-div">
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

          <div className="game-mode-card">
            <img
              src={clockIcon}
              alt="Banana Numbers Logo"
              className="mode-icon"
            />
            <h2 className="mode-title">Epic Mode</h2>
            <p className="mode-description">
              Race against the clock. Guess as much as you can before time runs
              out!
            </p>

            <button
              className="play-button"
              style={{ backgroundColor: "#F97316" }}
              onClick={handlePlayEpic}>
              Play Epic
            </button>
          </div>
        </div>
        <div className="stats">
          <div className="stat-card">
            <img src={trophyIcon} alt="Trophy Icon" className="trophy-icon" />
            <p className="stat-type">High Score</p>
            <p className="stat">1234</p>
          </div>
          <div className="stat-card">
            <img src={gameIcon} alt="Game Icon" className="game-icon" />
            <p className="stat-type">Games Played</p>
            <p className="stat">42</p>
          </div>
          <div className="stat-card">
            <img src={starIcon} alt="Star Icon" className="star-icon" />
            <p className="stat-type">Best Time</p>
            <p className="stat">0:07</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default GameModes;
