import "./App.css";
import Student from "./components/Student";

function App() {
  return (
    <div className="app">
      <h1>Experiment 7 - React Components using JSX and Props</h1>

      <Student
        name="Kanak Gupta"
        course="BCA"
        marks="92"
      />

      <Student
        name="Rahul Sharma"
        course="MCA"
        marks="88"
      />

      <Student
        name="Priya Singh"
        course="B.Tech"
        marks="95"
      />
    </div>
  );
}

export default App;