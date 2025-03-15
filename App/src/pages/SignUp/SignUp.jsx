import React from "react";
import { useNavigate } from "react-router";
import Layout from "../../../Layout/Layout";
import googleIcon from "../../assets/google.svg";
import "./SignUp.css"; // Import the SignUp-specific styles

function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Signing up...");
  };

  const handleLogin = () => {
    navigate("/sign-in");
  };

  return (
    <Layout>
      <div className="signup-container">
        <div>
          <h1 className="signupTitle">Create an account</h1>
          <form onSubmit={handleSignUp}>
            <div className="email-input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter Your Email" required />
            </div>
            <div className="username-input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Enter Your Username" required />
            </div>
            <div className="password-input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter Your Password" required />
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
          <div className="or-divider">
            <span>Or</span>
          </div>
          <button className="google-signup-button">
            <img src={googleIcon} alt="Google Icon" className="google-icon" width={"19px"} />
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
