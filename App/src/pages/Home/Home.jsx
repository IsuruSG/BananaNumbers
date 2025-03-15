import React from "react";
import logo from "../../assets/logo.svg";
import "./Home.css";
import { useNavigate } from "react-router";
import Layout from "../../../Layout/Layout";

const Home = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/sign-in");
  };

  const handleGuestClick = () => {
    navigate("/game-modes");
  };

  return (
    <Layout>
      <header className="header">
        <img src={logo} alt="Banana Numbers Logo" className="logo" />
        <h1 className="gameName">Banana Numbers</h1>
        <p className="helperText">Can you guess the missing number?</p>
      </header>
      <div className="buttons">
        <button className="sign-in-button" onClick={handleSignInClick}>
          Sign in
        </button>
        <button className="guest-button" onClick={handleGuestClick}>
          Play as a guest
        </button>
      </div>
    </Layout>
  );
};

export default Home;
