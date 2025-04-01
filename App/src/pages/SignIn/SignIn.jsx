import React, { useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../../../Layout/Layout";
import googleIcon from "../../assets/google.svg";
import "./SignIn.css";
import axios from "axios";

function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7050/api/Auth/login",
        formData
      );

      if (response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.name);

        navigate("/game-modes");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <Layout>
      <div className="signin-container">
        <div>
          <h1 className="loginTitle">Login</h1>
          <form onSubmit={handleSignIn}>
            <div className="email-input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="password-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="forgot-password-div">
              <a href="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="signin-button">
              Login
            </button>
          </form>
          <div className="or-divider">
            <span>Or</span>
          </div>
          <button className="google-login-button">
            <img
              src={googleIcon}
              alt="Google Icon"
              className="google-icon"
              width={"19px"}
            />
            Login with Google
          </button>
        </div>
        <div>
          <p className="signup-prompt">
            Don't have an account?{" "}
            <button className="signup-link" onClick={handleSignUp}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default SignInPage;
