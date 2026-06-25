import React from "react";
import { categories } from "../data/questions.js";
import "./HomeScreen.css";

function HomeScreen({ onStart }) {
  return (
    <div className="home">
      <div className="home__header">
        <div className="home__badge">QUIZ MASTER</div>
        <h1 className="home__title">
          Test Your<br />
          <span className="home__title--accent">Knowledge</span>
        </h1>
        <p className="home__subtitle">
          Pick a category and challenge yourself with 5 questions.
        </p>
      </div>

      <div className="home__grid">
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            className="cat-card"
            style={{ "--cat-color": cat.color, animationDelay: `${i * 80}ms` }}
            onClick={() => onStart(cat)}
          >
            <div className="cat-card__glow" />
            <span className="cat-card__icon">{cat.icon}</span>
            <span className="cat-card__name">{cat.name}</span>
            <span className="cat-card__count">{cat.questions.length} questions</span>
            <span className="cat-card__arrow">→</span>
          </button>
        ))}
      </div>

      <p className="home__footer">Choose any category to begin</p>
    </div>
  );
}

export default HomeScreen;