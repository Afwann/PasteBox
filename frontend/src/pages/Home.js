import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => (
  <div className={styles.homeContainer}>
    <div className={styles.homeContent}>
      <h1 className={styles.homeTitle}>Welcome to PasteBox</h1>
      <p className={styles.homeTagline}>
        Copy, Paste, and Secure your secrets here...
      </p>
      <div className={styles.homeLinks}>
        <Link to="/login" className={styles.homeLink}>
          Login
        </Link>
        <Link to="/register" className={styles.homeLink}>
          Register
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
