import React, { useState } from "react";
import ErrorModal from "../Modal/ErrorModal";
import Button from "../UI/Button";
import Card from "../UI/Card";

import styles from "./AddUserForm.module.css";
const AddUserForm = (props) => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const usernameChangeHandler = (e) => setUsername(e.target.value);

  const ageChangeHandler = (e) => setAge(e.target.value);

  const userSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "" || age.trim() === "") {
      setError("Please enter a valid name and age (non-empty values).");
      resetForm();
      return;
    }
    if (+age <= 0) {
      setError("Please enter a valid age (>0).");
      resetForm();
      return;
    }
    props.onSubmitUser({ username, age });
    resetForm();
  };

  const resetForm = () => {
    setUsername("");
    setAge("");
  };

  const closePopupHandler = () => {
    setError("");
  };

  return (
    <div>
      <Card className={styles.input}>
        <form className={styles.form} onSubmit={userSubmitHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
      <ErrorModal error={error} onClosePopup={closePopupHandler} />
    </div>
  );
};

export default AddUserForm;
