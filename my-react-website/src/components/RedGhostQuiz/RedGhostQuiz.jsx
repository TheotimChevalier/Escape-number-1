// src/components/RedGhostQuiz.jsx
import React, { useState } from "react";

const questions = [
  { question: "En quelle année Pac-Man est-il sorti ?", answer: "1980" },
  { question: "Quel est le nom du fantôme rouge ?", answer: "blinky" },
  { question: "Quel est le nom du fantôme bleu ?", answer: "inky" },
  { question: "Quel est le nom du fantôme rose ?", answer: "pinky" },
  { question: "Quel est le nom du fantôme vert/orange ?", answer: "clyde" },
  { question: "Quel est le fruit bonus qui rapporte le plus de points dans Pac-Man ?", answer: "cerise" },
  { question: "Quelle entreprise a créé Pac-Man ?", answer: "namco" },
  { question: "Combien de points vaut une pastille normale ?", answer: "10" },
  { question: "Quel est le record mondial de score parfait dans Pac-Man ?", answer: "333360" },
  { question: "Les bornes d'arcade originales étaient principalement en bois ou métal ?", answer: "bois" },
];

export default function RedGhostQuiz({ onClose }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let correct = 0;
    answers.forEach((ans, i) => {
      if(ans.trim().toLowerCase() === questions[i].answer.toLowerCase()) correct++;
    });
    setScore(correct);
    setPassed(correct >= Math.ceil(questions.length / 2));
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers(Array(questions.length).fill(""));
    setSubmitted(false);
    setScore(0);
    setPassed(false);
  };

  return (
    <div style={{
      position: "fixed",
      top: "5%",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#fff",
      padding: "20px",
      border: "2px solid red",
      borderRadius: "10px",
      zIndex: 1000,
      width: "90%",
      maxWidth: "600px",
      maxHeight: "90%",
      overflowY: "auto",
      boxShadow: "0 0 15px rgba(0,0,0,0.5)"
    }}>
      {!submitted ? (
        <>
          <h2>🎮 Quiz Pac-Man !</h2>
          {questions.map((q, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <label>{i+1}. {q.question}</label><br/>
              <input
                type="text"
                value={answers[i]}
                onChange={e => handleChange(i, e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          ))}
          <button onClick={handleSubmit}>Valider le quiz</button>
        </>
      ) : (
        <>
          {passed ? (
            <div>
              <h2>✅ Bravo !</h2>
              <p>Tu as répondu correctement à {score}/{questions.length} questions.</p>
              <p>Tu as débloqué le bonus du fantôme rouge ! 🎉</p>
              <button onClick={onClose}>Fermer</button>
            </div>
          ) : (
            <div>
              <h2>❌ Pas assez de bonnes réponses</h2>
              <p>Tu as répondu correctement à {score}/{questions.length} questions.</p>
              <p>Il faut au moins 50% pour réussir. Essaie à nouveau !</p>
              <button onClick={handleRetry}>Réessayer</button>
              <button onClick={onClose} style={{marginLeft: "10px"}}>Fermer</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
