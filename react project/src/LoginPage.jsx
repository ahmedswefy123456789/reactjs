import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./LoginContext";

export default function LoginPage() {
  const { login } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((username === "abdo" || username === "admin")  && password === "123" || password === "admin123") {
      login();
      console.log("navigating to /dashboard");
      navigate("/dashboard");
    } else {
      setErrorMsg("Invalid username or password");
    }
  };

  return (



    <div className="login-page">
          <header className="ProjectName">
        <h1 className="text-ProjectName"> Weather Dashboard </h1>
          </header>

      <form
        onSubmit={handleSubmit}
        className="form-container"
      >
        <h2 className="text-signin"> Sign in</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input input-username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-password "
        />
        {errorMsg && (
          <div className="error error-msg">{errorMsg}</div>
        )}
        <button
          type="submit"
          className="btn btn-signin"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}