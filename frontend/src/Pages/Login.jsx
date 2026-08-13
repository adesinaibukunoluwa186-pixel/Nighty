import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleLogin = () => {
    axios
      .post("http://127.0.0.1:8000/api/login/", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        alert("Login Successful!");
      })
      .catch(() => {
        alert("Invalid username or password");
      });
  };

  render() {
    return (
      <div>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={(e) =>
            this.setState({ username: e.target.value })
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={(e) =>
            this.setState({ password: e.target.value })
          }
        />

        <br /><br />

        <button onClick={this.handleLogin}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;