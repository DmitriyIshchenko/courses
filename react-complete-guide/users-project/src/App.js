import React, { useState } from "react";
import AddUserForm from "./components/AddUserForm/AddUserForm";
import UsersList from "./components/User/UsersList";

function App() {
  const [users, setUsers] = useState([]);

  const addUserHandler = (user) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers.push({ ...user, id: Math.random().toString() });
      return updatedUsers;
    });
  };
  return (
    <div>
      <AddUserForm onSubmitUser={addUserHandler} />
      <UsersList users={users} />
    </div>
  );
}

export default App;
