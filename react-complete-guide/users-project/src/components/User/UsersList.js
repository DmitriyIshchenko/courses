import React from "react";
import Card from "../UI/Card";

import styles from "./UsersList.module.css";

const UsersList = ({ users }) => {
  if (users.length === 0) return;
  return (
    <Card className={styles.users}>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
