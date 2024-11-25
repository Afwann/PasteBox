import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If a token exists, redirect to the main page (create-snippet)
    if (localStorage.getItem("token")) {
      navigate("/create-snippet");
    }
  }, [navigate]);

  const validateUsername = (username) => {
    return (
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/.test(username) &&
      !/(\.\.)|(^\.)|(\.$)/.test(username)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateUsername(username)) {
      setError(
        "Invalid username. Rules: " +
          "1) Only letters (a-z), numbers (0-9), and periods (.) are allowed. " +
          "2) Username cannot begin or end with a period. " +
          "3) No double periods (..)."
      );
      return;
    }

    try {
      const response = await axios.post("/api/users/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/create-snippet");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid login credentials. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authContainer}>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <h2 className={styles.authTitle}>Login</h2>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.authInput}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.authInput}
          />
          <button className={styles.authButton} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
