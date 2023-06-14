import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const handleDecreaseStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };
  const handleIncreaseStep = () => {
    setStep((s) => s + 1);
  };
  const handleDecreaseCount = () => {
    if (count >= step) setCount((c) => c - step);
  };
  const handleIncreaseCount = () => {
    setCount((c) => c + step);
  };

  return (
    <div className="counter">
      <div>
        <button onClick={handleDecreaseStep}>-</button>
        <span>Step: {step}</span>
        <button onClick={handleIncreaseStep}>+</button>
      </div>

      <div>
        <button onClick={handleDecreaseCount}>-</button>
        <span>Count: {count}</span>
        <button onClick={handleIncreaseCount}>+</button>
      </div>
    </div>
  );
}
export default App;
