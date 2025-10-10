// src/components/RedGhostQuiz.jsx
import React, { useState, useMemo } from "react";

// 🔹 Liste de 30 questions Pac-Man et bornes d'arcade
const allQuestions = [
  { question: "En quelle année Pac-Man est-il sorti ?", answer: "1980", options: ["1979", "1980", "1981", "1982"] },
  { question: "Quel est le nom du fantôme rouge ?", answer: "blinky", options: ["inky", "pinky", "blinky", "clyde"] },
  { question: "Quel est le nom du fantôme bleu ?", answer: "inky", options: ["inky", "pinky", "blinky", "clyde"] },
  { question: "Quel est le nom du fantôme rose ?", answer: "pinky", options: ["inky", "pinky", "blinky", "clyde"] },
  { question: "Quel est le nom du fantôme vert/orange ?", answer: "clyde", options: ["inky", "pinky", "blinky", "clyde"] },
  { question: "Quel fruit bonus rapporte le plus de points dans Pac-Man ?", answer: "cerise", options: ["pomme", "cerise", "orange", "fraise"] },
  { question: "Combien de fantômes poursuivent Pac-Man ?", answer: "4", options: ["3", "4", "5", "6"] },
  { question: "Quelle est la couleur du fantôme Blinky ?", answer: "rouge", options: ["bleu", "rose", "rouge", "orange"] },
  { question: "Quelle est la couleur du fantôme Inky ?", answer: "bleu", options: ["bleu", "rose", "rouge", "orange"] },
  { question: "Quelle est la couleur du fantôme Pinky ?", answer: "rose", options: ["bleu", "rose", "rouge", "orange"] },
  { question: "Quelle est la couleur du fantôme Clyde ?", answer: "orange", options: ["bleu", "rose", "rouge", "orange"] },
  { question: "Combien de points vaut une pastille normale ?", answer: "10", options: ["10", "50", "100", "500"] },
  { question: "Combien de points vaut une pastille spéciale (power pellet) ?", answer: "50", options: ["10", "50", "100", "200"] },
  { question: "Combien de points vaut une cerise ?", answer: "100", options: ["50", "100", "150", "200"] },
  { question: "Quel fruit apparaît après la 100ème pastille ?", answer: "fraise", options: ["cerise", "pomme", "fraise", "orange"] },
  { question: "Pac-Man devait-il manger tous les points pour finir un niveau ?", answer: "oui", options: ["oui", "non"] },
  { question: "Quel est le fantôme le plus rapide ?", answer: "inky", options: ["inky", "blinky", "pinky", "clyde"] },
  { question: "Quelle entreprise a créé Pac-Man ?", answer: "namco", options: ["nintendo", "atari", "namco", "taito"] },
  { question: "Quel est le score parfait possible dans Pac-Man ?", answer: "333360", options: ["999999", "333360", "100000", "250000"] },
  { question: "Combien de niveaux Pac-Man a-t-il au total ?", answer: "256", options: ["100", "200", "255", "256"] },
  { question: "Les bornes d’arcade originales étaient principalement en bois ou métal ?", answer: "bois", options: ["bois", "métal"] },
  { question: "Dans quel pays est née l’industrie des jeux d’arcade ?", answer: "japon", options: ["usa", "japon", "corée", "allemagne"] },
  { question: "Quel est le nom du créateur de Pac-Man ?", answer: "toru iwatani", options: ["toru iwatani", "shigeru miyamoto", "hideo kojima", "masahiro sakurai"] },
  { question: "Quelle borne d’arcade est connue pour Space Invaders ?", answer: "taito", options: ["namco", "nintendo", "taito", "sega"] },
  { question: "Quelle borne d’arcade a popularisé Donkey Kong ?", answer: "nintendo", options: ["atari", "taito", "nintendo", "capcom"] },
  { question: "En quelle année Space Invaders est-il sorti ?", answer: "1978", options: ["1975", "1978", "1980", "1982"] },
  { question: "Quelle borne a introduit le joystick pour la première fois ?", answer: "atari pong", options: ["space invaders", "pac-man", "atari pong", "donkey kong"] },
  { question: "Quel est le nom de l’ennemi principal dans Donkey Kong ?", answer: "donkey kong", options: ["mario", "bowser", "donkey kong", "cranky kong"] },
  { question: "Quelle borne d’arcade a le score le plus élevé jamais enregistré ?", answer: "pac-man", options: ["pac-man", "donkey kong", "space invaders", "galaga"] },
  { question: "Quel accessoire était souvent utilisé pour tricher sur les bornes d’arcade ?", answer: "coin drop", options: ["coin drop", "aimbot", "cheat code", "speed mod"] },
];

export default function RedGhostQuiz({ onClose }) {
  const questions = useMemo(() => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  }, []);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  const handleSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[current] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    answers.forEach((ans, i) => {
      if (ans.trim().toLowerCase() === questions[i].answer.toLowerCase()) correct++;
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
    setCurrent(0);
  };

  const q = questions[current];
  const selected = answers[current];

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        {/* Crois pour fermer le composant */}
        <button style={styles.closeButton} onClick={onClose}>✖</button>

        {submitted ? (
          passed ? (
            <>
              <h2>✅ Bravo !</h2>
              <p>Tu as répondu correctement à {score}/{questions.length} questions.</p>
              <p>Tu as débloqué le bonus du fantôme rouge ! 🎉</p>
              <button onClick={onClose}>Fermer</button>
            </>
          ) : (
            <>
              <h2>❌ Pas assez de bonnes réponses</h2>
              <p>Tu as répondu correctement à {score}/{questions.length} questions.</p>
              <p>Il faut au moins 50% pour réussir. Essaie à nouveau !</p>
              <button onClick={handleRetry}>Réessayer</button>
              <button onClick={onClose} style={{ marginLeft: "10px" }}>Fermer</button>
            </>
          )
        ) : (
          <>
            <h2>🎮 Quiz Pac-Man</h2>
            <p><strong>Question {current + 1} / {questions.length}</strong></p>
            <p>{q.question}</p>
            <div>
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  style={{
                    ...styles.option,
                    backgroundColor: selected === opt ? "red" : "#eee",
                    color: selected === opt ? "white" : "black",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={!selected}
              style={styles.nextButton}
            >
              {current === questions.length - 1 ? "Terminer" : "Suivant"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// 💅 Styles
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
    pointerEvents: "auto",
  },
  container: {
    position: "relative", // nécessaire pour positionner la croix
    pointerEvents: "auto",
    background: "#fff",
    color: "black",
    padding: "20px",
    border: "3px solid red",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "90%",
    overflowY: "auto",
    boxShadow: "0 0 25px rgba(0,0,0,0.6)",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "red",
  },
  option: {
    display: "block",
    width: "100%",
    margin: "8px 0",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.2s",
  },
  nextButton: {
    marginTop: "10px",
    padding: "10px 20px",
    border: "none",
    backgroundColor: "red",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
