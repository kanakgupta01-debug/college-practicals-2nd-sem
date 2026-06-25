import React, { useState } from "react";
import HomeScreen from "./components/HomeScreen.jsx";
import QuizScreen from "./components/QuizScreen.jsx";
import ResultScreen from "./components/ResultScreen.jsx";
import "./App.css";

const SCREENS = { HOME: "home", QUIZ: "quiz", RESULT: "result" };

function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  const startQuiz = (category) => {
    setSelectedCategory(category);
    setScreen(SCREENS.QUIZ);
  };

  const finishQuiz = (result) => {
    setQuizResult(result);
    setScreen(SCREENS.RESULT);
  };

  const goHome = () => {
    setScreen(SCREENS.HOME);
    setSelectedCategory(null);
    setQuizResult(null);
  };

  const retryQuiz = () => {
    setScreen(SCREENS.QUIZ);
    setQuizResult(null);
  };

  return (
    <div className="app">
      {screen === SCREENS.HOME && <HomeScreen onStart={startQuiz} />}
      {screen === SCREENS.QUIZ && (
        <QuizScreen
          category={selectedCategory}
          onFinish={finishQuiz}
          onQuit={goHome}
        />
      )}
      {screen === SCREENS.RESULT && (
        <ResultScreen
          result={quizResult}
          category={selectedCategory}
          onRetry={retryQuiz}
          onHome={goHome}
        />
      )}
    </div>
  );
}

export default App;