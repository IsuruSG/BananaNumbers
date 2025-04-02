import { useEffect, useState } from "react";
import Layout from "../../../../Layout/Layout";
import "./ClassicMode.css";
import filledHeartIcon from "../../../assets/heartFilled.svg";
import heartIcon from "../../../assets/heart.svg";
import blueTimeIcon from "../../../assets/timeBlue.svg";
import menuIcon from "../../../assets/menu.svg";
import newGameIcon from "../../../assets/newGame.svg";
import AlertDialog from "../../../components/MuiAlert/MuiAlert";
import { useNavigate } from "react-router";

function ClassicMode() {
  const navigate = useNavigate();
  const [questionImage, setQuestionImage] = useState(null);
  const [solution, setSolution] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(20);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");

  // Fetch the question image and solution from the API
  const fetchQuestion = async () => {
    try {
      const response = await fetch(
        "https://marcconrad.com/uob/banana/api.php?out=json&base64=no"
      );
      const data = await response.json();
      setQuestionImage(data.question);
      setSolution(data.solution);
      setImageLoaded(false);
      setTimeLeft(20);
      setMessage("");
      setGameOver(false);
      setLives(3);
    } catch (error) {
      console.error("Error fetching question:", error);
      setMessage("❌ Failed to load question. Please try again.");
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (imageLoaded && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameOver) {
      setMessage("⏳ Time's up!");
      setAlertTitle("⏳ Time's up! Do you want to play another game?");
      setOpen(true);
      setGameOver(true);
    }
  }, [timeLeft, imageLoaded, gameOver]);

  // Handle answer change
  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  // Handle answer submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.trim() === solution?.toString()) {
      // setMessage(null);
      setMessage("✅ Correct Answer! Well Done! 🎉");
      setAlertTitle("✅ Correct Answer! Do you want to play another game?");
      setOpen(true);
      setGameOver(true);
    } else {
      setMessage("❌ Wrong Answer! Try Again.");
      setLives((prevLives) => prevLives - 1);
      if (lives === 1) {
        // setMessage(null);
        setAlertTitle("❌ No lives left! Do you want to play another game?");
        setOpen(true);
        setGameOver(true);
      }
    }
    setUserAnswer("");
  };

  // Handle image load and start the timer
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleMenu = () => {
    navigate("/game-modes");
  };

  const handleNewGame = () => {
    setLives(3);
    fetchQuestion();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    //   setAlertTitle("");
    setGameOver(true);
  };

  const formattedTime = String(timeLeft).padStart(2, "0");

  return (
    <Layout justifyContent={"space-around"}>
      <div className="game-container">
        <div className="top-container">
          <div className="lives">
            {Array.from({ length: 3 }, (_, index) => (
              <img
                key={index}
                src={index < lives ? filledHeartIcon : heartIcon}
                alt="Life"
                className="heart-icon"
              />
            ))}
          </div>
          <p className="timer">
            <img src={blueTimeIcon} alt="Time" className="time-icon" />
            00:{formattedTime}
          </p>
        </div>
        {/* Display Question Image */}
        {questionImage ? (
          <img
            src={questionImage}
            alt="Question"
            className="question-image"
            onLoad={handleImageLoad}
          />
        ) : (
          <p className="loading-text">Loading question...</p>
        )}

        <form className="answer-form" onSubmit={handleSubmit}>
          <div className="answer-input-group">
            <input
              type="number"
              id="answer"
              placeholder="Enter your guess"
              className="answer-input no-spinners"
              value={userAnswer}
              onChange={handleChange}
              disabled={gameOver}
              required
            />
            <button type="submit" className="submit-button" disabled={gameOver}>
              Submit Guess
            </button>
          </div>
        </form>

        {/* Display Result Message */}
        {message && <p className="result-message">{message}</p>}
      </div>
      <div className="button-group-container">
        <button className="menu-button" onClick={handleMenu}>
          <img
            src={menuIcon}
            alt="menu Icon"
            className="menu-icon"
            width={"19px"}
          />
          Menu
        </button>
        <button className="new-game-button" onClick={handleNewGame}>
          <img
            src={newGameIcon}
            alt="New Game Icon"
            className="new-game-icon"
            width={"19px"}
          />
          New game
        </button>
      </div>
      {open && (
        <AlertDialog
          open={open}
          handleStartNewGame={handleNewGame}
          handleClose={handleClose}
          alertTitle={alertTitle}
        />
      )}
    </Layout>
  );
}

export default ClassicMode;
