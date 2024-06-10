import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import axios from "axios";

class Register extends Component {
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

  signUpButton = async (event) => {
    const { username, password } = this.state;
    const history = this.props;
    event.preventDefault();
    try {
      await axios.post("/register", { username, password });
      history.push("/login");
    } catch (error) {
      console.log("Error signing up:", error.response.data.error);
    }
    window.location.href = "/login";
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
          autoComplete="current-password"
          className="password-input-field"
          value={password}
          required
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
          className="username-input-field"
          autoComplete="current-username"
          value={username}
          required
          onChange={this.onChangeUsername}
          placeholder="Email"
        />
      </>
    );
  };

  render() {
    return (
      <div className="register-container">
        <form className="form-container" onSubmit={this.signUpButton}>
          <h1 className="heading"> Register Here</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="signup-button">
            Signup
          </button>
          <p className="already-user">
            Allready User?{" "}
            <Link to="/login" className="link">
              Login
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Register;
