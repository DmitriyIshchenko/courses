import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [userTip, setUserTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);

  return (
    <div className="App">
      <BillInput bill={bill} onChange={setBill} />
      <TipInput tip={userTip} onChange={setUserTip}>
        <span>How did you like the service?</span>
      </TipInput>
      <TipInput tip={friendTip} onChange={setFriendTip}>
        <span>How did your friend like the service?</span>
      </TipInput>
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
function TipInput({ tip, onChange, children }) {
  return (
    <div>
      {children}
      <select value={tip} onChange={(e) => onChange(+e.target.value)}>
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
