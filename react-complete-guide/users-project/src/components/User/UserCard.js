import React from "react";

import styles from "./UserCard.module.css";

const UserCard = ({ user }) => {
  const { username, age } = user;
  return <li className={styles.card}>{`${username} (${age} years old)`}</li>;
};

export default UserCard;
