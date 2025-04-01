import React, { useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../../../Layout/Layout";
import googleIcon from "../../assets/google.svg";
import "./SignUp.css";
import axios from "axios";

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7050/api/Auth/register",
        formData
      );

      if (response.status === 200) {
        navigate("/sign-in");
      }
    } catch (err) {
      setError(err.response?.data?.errors?.join(", ") || "Registration failed");
    }
  };

  const handleLogin = () => {
    navigate("/sign-in");
  };

  return (
    <Layout>
      <div className="signup-container">
        <div>
          <h1 className="signupTitle">Create an account</h1>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSignUp}>
            <div className="name-input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="email-input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
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
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          <div className="or-divider">
            <span>Or</span>
          </div>
          <button className="google-signup-button">
            <img
              src={googleIcon}
              alt="Google Icon"
              className="google-icon"
              width={"19px"}
            />
            Sign up with Google
          </button>
        </div>
        <div>
          <p className="login-prompt">
            Already have an account?{" "}
            <button className="login-link" onClick={handleLogin}>
              Login
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default SignUpPage;
