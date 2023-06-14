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

  // const handleDecreaseStep = () => {
  //   if (step > 1) setStep((s) => s - 1);
  // };
  // const handleIncreaseStep = () => {
  //   setStep((s) => s + 1);
  // };
  const handleDecreaseCount = () => {
    setCount((c) => c - step);
  };
  const handleIncreaseCount = () => {
    setCount((c) => c + step);
  };

  const getDateString = () => {
    const date = new Date();
    date.setDate(date.getDate() + count);

    let str = "Today is";
    if (count > 0) str = `${count} days from now is`;
    if (count < 0) str = `${Math.abs(count)} days ago was`;

    return `${str} ${date.toDateString()}`;
  };

  return (
    <div className="counter">
      <div>
        <input
          value={step}
          onChange={(e) => {
            setStep(+e.target.value);
          }}
          type="range"
          min="0"
          max="10"
        />
        {step}
        {/* <button onClick={handleDecreaseStep}>-</button>
        <span>Step: {step}</span>
        <button onClick={handleIncreaseStep}>+</button> */}
      </div>

      <div>
        <button onClick={handleDecreaseCount}>-</button>
        {/* <span>Count: {count}</span> */}

        <input
          type="text"
          value={count}
          onChange={(e) => setCount(+e.target.value)}
        />
        <button onClick={handleIncreaseCount}>+</button>
      </div>

      <p>{getDateString()}</p>
    </div>
  );
}
export default App;
