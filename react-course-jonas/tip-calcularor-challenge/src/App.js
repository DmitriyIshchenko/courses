export default function App() {
  return (
    <div className="App">
      <BillInput />
      <TipInput></TipInput>
      <TipInput></TipInput>
      <Output />
      <ResetButton />
    </div>
  );
}

function BillInput() {
  return (
    <div>
      <span>How much was the bill?</span>
      <input type="text" />
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
function Output() {
  return <h2>You pay X ($Y + $Z tip)</h2>;
}
function ResetButton() {
  return <button>Reset</button>;
}
