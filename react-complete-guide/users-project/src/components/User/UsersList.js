import React from "react";
import UserCard from "./UserCard";

import styles from "./UsersList.module.css";

const UsersList = ({ users }) => {
  return (
    <ul className={styles.list}>
      {users.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </ul>
  );
};

export default UsersList;
