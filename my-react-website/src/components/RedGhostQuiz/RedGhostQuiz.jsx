// src/components/RedGhostQuiz.jsx
import React, { useState, useMemo } from "react";

// 🔹 Liste de 30 questions Pac-Man et bornes d'arcade
const allQuestions = [
  { question: "En quelle année Pac-Man est-il sorti ?", answer: "1980" },
  { question: "Quel est le nom du fantôme rouge ?", answer: "blinky" },
  { question: "Quel est le nom du fantôme bleu ?", answer: "inky" },
  { question: "Quel est le nom du fantôme rose ?", answer: "pinky" },
  { question: "Quel est le nom du fantôme vert/orange ?", answer: "clyde" },
  { question: "Quel fruit bonus rapporte le plus de points dans Pac-Man ?", answer: "cerise" },
  { question: "Combien de fantômes poursuivent Pac-Man ?", answer: "4" },
  { question: "Quelle est la couleur du fantôme Blinky ?", answer: "rouge" },
  { question: "Quelle est la couleur du fantôme Inky ?", answer: "bleu" },
  { question: "Quelle est la couleur du fantôme Pinky ?", answer: "rose" },
  { question: "Quelle est la couleur du fantôme Clyde ?", answer: "orange" },
  { question: "Combien de points vaut une pastille normale ?", answer: "10" },
  { question: "Combien de points vaut une pastille spéciale (power pellet) ?", answer: "50" },
  { question: "Combien de points vaut une cerise ?", answer: "100" },
  { question: "Quel fruit apparaît après la 100ème pastille ?", answer: "fraise" },
  { question: "Pac-Man devait-il manger tous les points pour finir un niveau ?", answer: "oui" },
  { question: "Quel est le fantôme le plus rapide ?", answer: "inky" },
  { question: "Quelle entreprise a créé Pac-Man ?", answer: "namco" },
  { question: "Quel est le score parfait possible dans Pac-Man ?", answer: "333360" },
  { question: "Combien de niveaux Pac-Man a-t-il au total ?", answer: "256" },
  { question: "Les bornes d’arcade originales étaient principalement en bois ou métal ?", answer: "bois" },
  { question: "Dans quel pays est née l’industrie des jeux d’arcade ?", answer: "japon" },
  { question: "Quel est le nom du créateur de Pac-Man ?", answer: "toru iwatani" },
  { question: "Quelle borne d’arcade est connue pour Space Invaders ?", answer: "taito" },
  { question: "Quelle borne d’arcade a popularisé Donkey Kong ?", answer: "nintendo" },
  { question: "En quelle année Space Invaders est-il sorti ?", answer: "1978" },
  { question: "Quelle borne a introduit le joystick pour la première fois ?", answer: "atari pong" },
  { question: "Quel est le nom de l’ennemi principal dans Donkey Kong ?", answer: "donkey kong" },
  { question: "Quelle borne d’arcade a le score le plus élevé jamais enregistré ?", answer: "pac-man" },
  { question: "Quel accessoire était souvent utilisé pour tricher sur les bornes d’arcade ?", answer: "coin drop" },
];

export default function RedGhostQuiz({ onClose }) {
  // 🔹 On choisit 10 questions aléatoires au montage
  const questions = useMemo(() => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }, []);

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
      color:"black",
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
  );
}
