import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);

  return (
    <div className="App">
      <BillInput bill={bill} onChange={setBill} />
      <TipInput></TipInput>
      <TipInput></TipInput>
      <Output bill={bill} />
      <ResetButton />
    </div>
  );
}

function BillInput({ bill, onChange }) {
  return (
    <div>
      <span>How much was the bill?</span>
      <input
        type="text"
        value={bill}
        onChange={(e) => onChange(+e.target.value)}
      />
    </div>
  );
}
function TipInput() {
  return (
    <div>
      <span>How did you like the service?</span>
      <select>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">Ok (5%)</option>
        <option value="10">Good (10%)</option>
        <option value="20">Amazing (20%)</option>
      </select>
    </div>
  );
}
function Output({ bill }) {
  return <h2>You pay X (${bill} + $Z tip)</h2>;
}
function ResetButton() {
  return <button>Reset</button>;
}
