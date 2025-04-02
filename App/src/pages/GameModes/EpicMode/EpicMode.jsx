import { useEffect, useState } from "react";
import Layout from "../../../../Layout/Layout";
import "./EpicMode.css";
import filledHeartIcon from "../../../assets/heartFilled.svg";
import heartIcon from "../../../assets/heart.svg";
import blueTimeIcon from "../../../assets/timeBlue.svg";
import goldtrophyIcon from "../../../assets/goldTrophy.svg";
import goldstarIcon from "../../../assets/goldStar.svg";
import menuIcon from "../../../assets/menu.svg";
import newGameIcon from "../../../assets/newGame.svg";
import infoIcon from "../../../assets/info.svg";
import AlertDialog from "../../../components/MuiAlert/MuiAlert";
import { useNavigate } from "react-router";
import RulesDialog from "../../../components/RulesDialog/RulesDialog";
import api from "../../../utils/api";
import Leaderboard from "../../../components/Leaderboard/Leaderboard";

function EpicMode() {
  const navigate = useNavigate();
  const [questionImage, setQuestionImage] = useState(null);
  const [solution, setSolution] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [correctRounds, setCorrectRounds] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Fetch the question from API
  const fetchQuestion = async () => {
    try {
      const response = await fetch(
        "https://marcconrad.com/uob/banana/api.php?out=json&base64=no"
      );
      const data = await response.json();
      setQuestionImage(data.question);
      setSolution(data.solution);
      setImageLoaded(false);
      setMessage("");
      setUserAnswer("");
    } catch (error) {
      console.error("Error fetching question:", error);
      setMessage("❌ Failed to load question. Please try again.");
    }
  };

  const saveGameResults = async () => {
    try {
      const gameDetails = {
        userId: localStorage.getItem("userId"),
        startTime: new Date(gameStartTime - (60 - timeLeft) * 1000),
        endTime: new Date(Date.now()),
        finalScore: score,
        totalRounds: round,
        correctRounds: correctRounds,
      };

      const response = await api.post("/Game/addGameDetails", gameDetails);

      if (response.data === "added-successfully") {
        console.log("Game results saved successfully");
      } else {
        console.warn("Failed to save game results");
      }
    } catch (error) {
      console.error("Error saving game results:", error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get("/Game/getTopScores");

      // console.log(response.data);
      setLeaderboardData(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  // Handle answer change
  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  useEffect(() => {
    if (
      imageLoaded &&
      timeLeft > 0 &&
      !gameOver &&
      !rulesOpen &&
      !leaderboardOpen
    ) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameOver) {
      endGame("⏳ Time's up!");
    }
  }, [timeLeft, imageLoaded, gameOver, rulesOpen, leaderboardOpen]);

  const startNewGame = () => {
    setTimeLeft(60);
    setScore(0);
    setRound(1);
    setLives(3);
    setAttempts(0);
    setCorrectRounds(0);
    setGameStartTime(null);
    setGameOver(false);
    setOpen(false);
    fetchQuestion();
  };

  const endGame = async (reason) => {
    setMessage(reason);
    setAlertTitle(`${reason}`);
    setAlertDescription(
      <div>
        <div>
          Final Score: <strong>{score}</strong>
        </div>
        <div style={{ marginTop: "8px" }}>
          Do you want to play another game?
        </div>
      </div>
    );
    setOpen(true);
    setGameOver(true);

    if (score > 0) {
      await saveGameResults();
    }
  };

  // Handle answer submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = userAnswer.trim() === solution?.toString();
    if (isCorrect) {
      console.log(correctRounds);
      const pointsEarned = attempts === 0 ? 30 : attempts === 1 ? 20 : 10;
      setScore(score + pointsEarned);
      setRound(round + 1);
      setCorrectRounds(correctRounds + 1);
      setAttempts(0);
      setMessage(`✅ Correct! +${pointsEarned} points`);
      fetchQuestion();
    } else {
      setAttempts(attempts + 1);
      setMessage(`❌ Try again (Attempt ${attempts + 1}/3)`);
      if (attempts >= 2) {
        setLives(lives - 1);
        setRound(round + 1);
        if (lives <= 1) {
          setRound(null);
          endGame("💔 Game Over!");
        } else {
          setAttempts(0);
          fetchQuestion();
        }
      }
    }
    setUserAnswer("");
  };

  // Handle image load and start the timer
  const handleImageLoad = () => {
    setImageLoaded(true);
    if (round === 1) {
      setGameStartTime(Date.now());
      console.log("Game started at:", new Date(Date.now()).toISOString());
    }
  };

  const handleMenu = () => {
    navigate("/game-modes");
  };

  const handleClose = () => {
    setOpen(false);
    //   setAlertTitle("");
    setGameOver(true);
    navigate("/game-modes");
  };

  const formattedTime = String(timeLeft).padStart(2, "0");

  const handleRulesOpen = () => {
    setRulesOpen(true);
  };

  const handleRulesClose = () => {
    setRulesOpen(false);
  };

  return (
    <Layout justifyContent={"space-around"}>
      <div className="topcontainer">
        <div className="statscontainer">
          <div className="life">
            {Array.from({ length: 3 }, (_, index) => (
              <img
                key={index}
                src={index < lives ? filledHeartIcon : heartIcon}
                alt="Life"
                className="hearticon"
              />
            ))}
          </div>
          <p className="timing">
            <img src={blueTimeIcon} alt="Time" className="timeicon" />
            00:{formattedTime}
            {(rulesOpen || leaderboardOpen) && (
              <span className="paused-indicator"> (Paused)</span>
            )}
          </p>
          <div className="score">
            <img src={goldstarIcon} alt="Score" className="goldstaricon" />
            {score}
          </div>
        </div>
        <div
          className="leaderboard"
          onClick={() => {
            setLeaderboardOpen(true);
            fetchLeaderboard();
          }}>
          <img src={goldtrophyIcon} alt="Trophy" className="goldtrophyicon" />
          Leaderboard
        </div>
      </div>
      <div className="gamecontainer">
        {/* Display Question Image */}
        {questionImage ? (
          <>
            <img
              src={questionImage}
              alt="Question"
              className="question-image"
              onLoad={handleImageLoad}
            />
            {round && <div className="round-info">Round: {round}</div>}
          </>
        ) : (
          <p className="loading-text">Loading question...</p>
        )}

        <form className="answer-form" onSubmit={handleSubmit}>
          <div className="ans-input-group">
            <input
              type="number"
              id="answer"
              placeholder="Enter your guess"
              className="ans-input no-spinners"
              value={userAnswer}
              onChange={handleChange}
              disabled={gameOver}
              required
            />
            <button type="submit" className="submit-btn" disabled={gameOver}>
              Submit Guess
            </button>
          </div>
        </form>

        {/* Display Result Message */}
        {message && <p className="result-message">{message}</p>}
      </div>
      <div className="btn-group-container">
        <button className="menu-btn" onClick={handleMenu}>
          <img
            src={menuIcon}
            alt="menu Icon"
            className="menu-icon"
            width={"25px"}
          />
          Menu
        </button>
        <button className="new-game-btn" onClick={startNewGame}>
          <img
            src={newGameIcon}
            alt="New Game Icon"
            className="new-game-icon"
            width={"28px"}
          />
          New game
        </button>
        <button className="rules-btn" onClick={handleRulesOpen}>
          <img
            src={infoIcon}
            alt="Rules Icon"
            className="rules-icon"
            width={"25px"}
          />
          Rules
        </button>
      </div>
      <Leaderboard
        open={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
        data={leaderboardData}
      />
      <RulesDialog open={rulesOpen} onClose={handleRulesClose} />
      {open && (
        <AlertDialog
          open={open}
          handleStartNewGame={startNewGame}
          handleClose={handleClose}
          alertTitle={alertTitle}
          alertDescription={alertDescription}
        />
      )}
    </Layout>
  );
}

export default EpicMode;
