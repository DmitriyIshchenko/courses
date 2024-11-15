import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";

import "./NewExpense.css";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const editingToggleHandler = () => {
    setIsEditing((prevState) => setIsEditing(!prevState));
  };

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };

    props.onAddExpense(expenseData);
    editingToggleHandler();
  };

  return (
    <div className="new-expense">
      {!isEditing && (
        <button onClick={editingToggleHandler}>Add New Expense</button>
      )}
      {isEditing && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={editingToggleHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
