import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => (
  <div className={styles.notFoundContainer}>
    <div className={styles.notFoundContent}>
      <h1 className={styles.notFoundTitle}>404 - Page Not Found</h1>
      <p className={styles.notFoundMessage}>
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/" className={styles.notFoundLink}>
        Go to Home
      </Link>
    </div>
  </div>
);

export default NotFound;
