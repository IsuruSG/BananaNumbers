import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../../../Layout/Layout";
import googleIcon from "../../assets/google.svg";
import "./SignIn.css";
import api from "../../utils/api";
import BackButton from "../../components/BackButton/BackButton";

function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate("/game-modes", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/Auth/login", formData);

      if (response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.name);

        const from = location.state?.from || "/game-modes";
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.errors?.join(", ") ||
          err.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <Layout>
      <div className="nav-control left">
        <BackButton />
      </div>
      <div className="signin-container">
        <div>
          <h1 className="loginTitle">Login</h1>
          {error && <div className="error-message">{error}</div>}
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
          {/* <div className="or-divider">
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
          </button> */}
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
