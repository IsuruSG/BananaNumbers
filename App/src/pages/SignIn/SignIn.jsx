import React from "react";
import { useNavigate } from "react-router";
import Layout from "../../../Layout/Layout";
import googleIcon from "../../assets/google.svg";
import "./SignIn.css";

function SignInPage() {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Signing in...");
  };

  // const handleSignUp = () => {
  //   navigate("/sign-up");
  // };

  return (
    <Layout>
      <div className="signin-container">
        <div>
          <h1 className="loginTitle">Login</h1>
          <form onSubmit={handleSignIn}>
            <div className="email-input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your Email" required />
            </div>
            <div className="password-input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter Your Password" required />
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
            <img src={googleIcon} alt="Google Icon" className="google-icon" width={"19px"} />
            Login with Google
          </button>
        </div>
        <div>
          <p className="signup-prompt">
            Don't have an account? <button className="signup-link">Sign Up</button>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default SignInPage;
