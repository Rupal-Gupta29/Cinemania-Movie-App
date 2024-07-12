import React from "react";
import styles from "./error.module.css";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className={styles.errorWrapper}>
      <img
        src="/src/assets/not-found.png"
        alt="not found"
        className={styles.errorImg}
      />
      <Link to={"/"}>Go to Homepage</Link>
    </div>
  );
};

export default Error;
