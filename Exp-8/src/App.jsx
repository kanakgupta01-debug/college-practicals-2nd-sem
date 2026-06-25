import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="container">
      <h1>Experiment 8</h1>
      <h2>State Management using useState Hook</h2>

      <div className="counter-box">
        <h3>Counter Value: {count}</h3>

        <button onClick={increment}>Increment (+)</button>

        <button onClick={decrement}>Decrement (-)</button>

        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;