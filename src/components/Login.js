import React, { useState } from "react";
import axios from "axios";

function Login({ username, setUsername, clientId }) {
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState("");

  const sendLogin = async () => {
    setLoginLoading(true);

    await axios
      .post(
        "http://localhost:3000/login",
        { clientId: clientId, username, password },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          mode: "no-cors",
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoginLoading(false);
      });

    // setInputValue('');
  };

  return (
    <div>
      <h4>Login</h4>

      <div className="loginForm">
        <div className="input-container">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={sendLogin}>
            {loginLoading ? "loading ..." : "Login"}
          </button>{" "}
        </div>
      </div>
    </div>
  );
}

export default Login;
