import React from "react";
import Button from "../UI/Button";

import styles from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <div>
      <div
        className={`${styles.overlay} ${!props.error && styles.hidden}`}
        onClick={props.onClosePopup}
      ></div>
      <div className={`${styles.popup} ${!props.error && styles.hidden}`}>
        <header className={styles.header}>Invalid input</header>
        <p className={styles.message}>{props.error}</p>
        <Button onClick={props.onClosePopup}>Okay</Button>
      </div>
    </div>
  );
};

export default ErrorModal;
