// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [selectedFrom, setSelectedFrom] = useState("USD");
  const [selectedTo, setSelectedTo] = useState("EUR");
  const [output, setOutput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchRates() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${selectedFrom}&to=${selectedTo}`
        );

        const data = await res.json();
        console.log(data);

        setOutput(data.rates[selectedTo]);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (!amount) return setOutput(0);
    if (selectedFrom === selectedTo) return setOutput(amount);

    fetchRates();
  }, [selectedFrom, selectedTo, amount]);

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
      <p>{isLoading ? "Loading..." : output}</p>
    </div>
  );
}
