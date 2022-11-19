import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";

import "./Expenses.css";

function Expenses(props) {
  const expenses = props.items.map((item) => (
    <ExpenseItem
      key={item.id}
      title={item.title}
      amount={item.amount}
      date={item.date}
    />
  ));
  return <Card className="expenses">{expenses}</Card>;
}

export default Expenses;
