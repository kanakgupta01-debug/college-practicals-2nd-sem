import React from "react";
import "./ResultScreen.css";

function getGrade(score, total) {
  const pct = (score / total) * 100;
  if (pct === 100) return { label: "Perfect!",   emoji: "🏆", color: "#fbbf24" };
  if (pct >= 80)   return { label: "Excellent!",  emoji: "🌟", color: "#00d4aa" };
  if (pct >= 60)   return { label: "Good Job!",   emoji: "👏", color: "#a78bfa" };
  if (pct >= 40)   return { label: "Not Bad",     emoji: "💪", color: "#60a5fa" };
  return                 { label: "Keep Trying",  emoji: "📚", color: "#ff6b6b" };
}

function ResultScreen({ result, category, onRetry, onHome }) {
  const { score, total, answers } = result;
  const grade = getGrade(score, total);
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="result" style={{ "--cat-color": category.color, "--grade-color": grade.color }}>
      <div className="result__card">
        <div className="result__emoji">{grade.emoji}</div>
        <div className="result__grade">{grade.label}</div>
        <div className="result__score-row">
          <span className="result__score-num">{score}</span>
          <span className="result__score-sep">/</span>
          <span className="result__score-total">{total}</span>
        </div>
        <div className="result__pct">{percentage}% correct</div>
        <div className="result__ring-wrap">
          <svg viewBox="0 0 100 100" className="result__ring-svg">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="44" fill="none"
              stroke={grade.color}
              strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${2 * Math.PI * 44 * (1 - percentage / 100)}`}
              strokeLinecap="round"
              style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dashoffset 1s ease" }}
            />
          </svg>
        </div>
      </div>

      <div className="result__breakdown">
        <h3 className="result__breakdown-title">Answer Breakdown</h3>
        <div className="result__answers">
          {answers.map((ans, i) => (
            <div key={i} className={`ans-row ${ans.isCorrect ? "ans-row--correct" : "ans-row--wrong"}`}>
              <span className="ans-row__icon">{ans.isCorrect ? "✓" : "✗"}</span>
              <div className="ans-row__body">
                <p className="ans-row__q">{ans.question}</p>
                {!ans.isCorrect && <p className="ans-row__correct">Correct: {ans.correct}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="result__actions">
        <button className="btn btn--primary" onClick={onRetry}>Try Again</button>
        <button className="btn btn--ghost" onClick={onHome}>← All Categories</button>
      </div>
    </div>
  );
}

export default ResultScreen;