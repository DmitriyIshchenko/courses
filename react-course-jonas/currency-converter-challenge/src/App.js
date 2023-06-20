// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [selectedFrom, setSelectedFrom] = useState("USD");
  const [selectedTo, setSelectedTo] = useState("EUR");

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
      />
      <select
        value={selectedFrom}
        onChange={(e) => setSelectedFrom(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={selectedTo}
        onChange={(e) => setSelectedTo(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT</p>
    </div>
  );
}
