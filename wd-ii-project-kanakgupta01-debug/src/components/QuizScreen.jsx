import React, { useState, useEffect, useCallback } from "react";
import "./QuizScreen.css";

const TIME_PER_QUESTION = 20;

function QuizScreen({ category, onFinish, onQuit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  const questions = category.questions;
  const currentQ = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  const nextQuestion = useCallback(
    (chosenOption) => {
      const isCorrect = chosenOption === currentQ.answer;
      const newAnswers = [
        ...answers,
        { question: currentQ.question, chosen: chosenOption, correct: currentQ.answer, isCorrect },
      ];
      const newScore = isCorrect ? score + 1 : score;

      if (currentIndex + 1 < questions.length) {
        setAnswers(newAnswers);
        setScore(newScore);
        setCurrentIndex((i) => i + 1);
        setSelected(null);
        setRevealed(false);
        setTimeLeft(TIME_PER_QUESTION);
      } else {
        onFinish({ score: newScore, total: questions.length, answers: newAnswers, category });
      }
    },
    [currentIndex, currentQ, answers, score, questions.length, category, onFinish]
  );

  useEffect(() => {
    if (revealed) return;
    if (timeLeft <= 0) {
      setRevealed(true);
      setTimeout(() => nextQuestion(null), 1200);
      return;
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, revealed, nextQuestion]);

  const handleSelect = (option) => {
    if (revealed) return;
    setSelected(option);
    setRevealed(true);
    setTimeout(() => nextQuestion(option), 900);
  };

  const getOptionClass = (option) => {
    if (!revealed) return "option";
    if (option === currentQ.answer) return "option option--correct";
    if (option === selected && option !== currentQ.answer) return "option option--wrong";
    return "option option--dim";
  };

  const timerPercent = (timeLeft / TIME_PER_QUESTION) * 100;
  const timerColor = timeLeft > 10 ? "#00d4aa" : timeLeft > 5 ? "#fbbf24" : "#ff6b6b";

  return (
    <div className="quiz" style={{ "--cat-color": category.color }}>
      <div className="quiz__header">
        <button className="quiz__quit" onClick={onQuit}>✕ Quit</button>
        <div className="quiz__meta">
          <span className="quiz__category">{category.icon} {category.name}</span>
          <span className="quiz__score-label">Score: {score}</span>
        </div>
      </div>

      <div className="quiz__progress-track">
        <div className="quiz__progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="quiz__counter">
        <span className="quiz__counter-current">{currentIndex + 1}</span>
        <span className="quiz__counter-sep">/</span>
        <span className="quiz__counter-total">{questions.length}</span>
      </div>

      <div className="quiz__timer-wrap">
        <svg className="quiz__timer-svg" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
          <circle
            cx="30" cy="30" r="26" fill="none"
            stroke={timerColor}
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 26}`}
            strokeDashoffset={`${2 * Math.PI * 26 * (1 - timerPercent / 100)}`}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1s linear, stroke 0.3s ease",
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%"
            }}
          />
        </svg>
        <span className="quiz__timer-num" style={{ color: timerColor }}>{timeLeft}</span>
      </div>

      <div className="quiz__question-box">
        <p className="quiz__question">{currentQ.question}</p>
      </div>

      <div className="quiz__options">
        {currentQ.options.map((option, i) => (
          <button
            key={option}
            className={getOptionClass(option)}
            onClick={() => handleSelect(option)}
            style={{ animationDelay: `${i * 60}ms` }}
            disabled={revealed}
          >
            <span className="option__letter">{String.fromCharCode(65 + i)}</span>
            <span className="option__text">{option}</span>
            {revealed && option === currentQ.answer && <span className="option__icon">✓</span>}
            {revealed && option === selected && option !== currentQ.answer && <span className="option__icon">✗</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizScreen;