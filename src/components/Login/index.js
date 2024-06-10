import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  loginButton = async (event) => {
    const { username, password } = this.state;
    event.preventDefault();
    try {
      const response = await axios.post("/login", { username, password });
      const token = response.data.token;
      localStorage.setItem("jwt_token", token);
    } catch (error) {
      console.error("Error logging in:", error.response.data.error);
    }
    window.location.href = "/home";
  };

  renderPasswordField = () => {
    const { password } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          className="password-input-field"
          value={password}
          required
          autoComplete="current-password"
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="email"
          autoComplete="current-username"
          required
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Email"
        />
      </>
    );
  };

  render() {
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.loginButton}>
          <h1 className="heading">Login Page</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="signin-button">
            Login
          </button>

          <p className="already-user">
            New User?{" "}
            <Link to="/" className="link">
              Register
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
