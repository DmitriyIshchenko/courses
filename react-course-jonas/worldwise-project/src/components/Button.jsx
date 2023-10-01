import styles from "./Button.module.css";

function Button({ children, onClick, type, ...rest }) {
  return (
    <button
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
