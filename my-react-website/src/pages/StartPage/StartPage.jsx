import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import "../../styles/App.css";


const MAX_SECONDS = 45 * 60; // 45 minutes

function PacManGame({ onWin }) {
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);

  const eatDot = () => {
    if (score < 4) setScore(score + 1);
    if (score + 1 === 5) {
      setWon(true);
      onWin();
    }
  };

  return (
    <div className="pacman-game">
      <div className="pacman-row">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`dot ${i < score ? "eaten" : ""}`}
            onClick={i === score && !won ? eatDot : undefined}
            style={{ cursor: i === score && !won ? "pointer" : "default" }}
          >
            ●
          </span>
        ))}
        <span className="pacman">😋</span>
      </div>
      <p>Avance Pac-Man en cliquant sur les points !</p>
      {won && <div className="reward">Bravo, tu as gagné une clé : <b>PACKEY</b></div>}
    </div>
  );
}

function App() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [pacmanWon, setPacmanWon] = useState(false);
  const intervalRef = useRef(null);

  // Chrono
  const start = () => {
    if (!running && seconds < MAX_SECONDS) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= MAX_SECONDS) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return MAX_SECONDS;
          }
          return s + 1;
        });
      }, 1000);
    }
  };
  const stop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };
  const reset = () => {
    stop();
    setSeconds(0);
  };
  const formatTime = (s) =>
    `${String(Math.floor((MAX_SECONDS - s) / 60)).padStart(2, "0")}:${String((MAX_SECONDS - s) % 60).padStart(2, "0")}`;

  // Contrôle A (code caché)
  const [showHidden, setShowHidden] = useState(false);
  React.useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "a") setShowHidden(true);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Énigme image
  const [imgAnswer, setImgAnswer] = useState("");
  const [imgSolved, setImgSolved] = useState(false);

  // Énigme date
  const [dateAnswer, setDateAnswer] = useState("");
  const [dateSolved, setDateSolved] = useState(false);

  // Emoji
  const [emojiSolved, setEmojiSolved] = useState(false);

  // Navigation étapes
  const goToStep = (n) => setStep(n);

  return (
    <div className="escape-container">
      <header>
        <h1>Escape Game</h1>
        <p className="subtitle">
          Pour commencer la première étape,{" "}
          <span
            className="fake-link"
            onClick={() => goToStep(1)}
            style={{ color: "#ff3b3b", cursor: "pointer", fontWeight: "bold" }}
          >
            cliquer ici
          </span>
          .
        </p>
        <button
          className="red-btn"
          onClick={() => goToStep(1)}
          style={{ marginTop: 10 }}
        >
          Bouton rouge
        </button>
      </header>
      <div className="chrono-section">
        <div className={`chrono ${seconds >= MAX_SECONDS ? "chrono-finished" : ""}`}>
          {seconds < MAX_SECONDS ? formatTime(seconds) : "Temps écoulé !"}
        </div>
        <div className="chrono-buttons">
          <button onClick={start} disabled={running || seconds >= MAX_SECONDS}>Démarrer</button>
          <button onClick={stop} disabled={!running}>Pause</button>
          <button onClick={reset}>Réinitialiser</button>
        </div>
      </div>
      <main>
        <Outlet />
        {step === 0 && (
          <div className="enigmes-zone">
            <p>
              Bienvenue dans l'escape game !<br />
              Pour commencer, trouve comment passer à la première étape...
            </p>
          </div>
        )}
        {step === 1 && (
          <div className="enigmes-zone">
            <h2>Énigme 1 : Clique sur l'emoji</h2>
            <p>
              Pour avancer, il faut cliquer sur le bon emoji&nbsp;:
              <span
                style={{ fontSize: "2em", cursor: "pointer", marginLeft: 10 }}
                onClick={() => { setEmojiSolved(true); goToStep(2); }}
                role="img"
                aria-label="clé"
              >🔑</span>
            </p>
            <p>
              (Indice : ce n'est pas le bouton, mais l'emoji !)
            </p>
          </div>
        )}
        {step === 2 && (
          <div className="enigmes-zone">
            <h2>Mini-jeu Pac-Man</h2>
            <PacManGame onWin={() => setPacmanWon(true)} />
            {pacmanWon && (
              <button onClick={() => goToStep(3)} style={{ marginTop: 20 }}>
                Étape suivante
              </button>
            )}
          </div>
        )}
        {step === 3 && (
          <div className="enigmes-zone">
            <h2>Énigme cachée</h2>
            <p>
              Un code est caché quelque part sur cette page...<br />
              <span
                className="hidden-code"
                style={{
                  background: "#181818",
                  color: "#181818",
                  userSelect: "text",
                  padding: "2px 8px",
                  borderRadius: "4px"
                }}
              >
                {showHidden ? "HIDDEN123" : "      "}
              </span>
              <br />
              (Astuce : essaye de tout sélectionner avec Ctrl+A)
            </p>
            <button onClick={() => goToStep(4)} style={{ marginTop: 20 }}>
              Étape suivante
            </button>
          </div>
        )}
        {step === 4 && (
          <div className="enigmes-zone">
            <h2>Énigme image</h2>
            <p>
              Observe bien cette image et devine la clé (astuce : essaye de l'enregistrer sous...)<br />
              <img src="/enigme.jpg" alt="Énigme" style={{ maxWidth: 200, margin: "20px 0" }} />
            </p>
            <input
              type="text"
              placeholder="Nom du fichier (sans extension)"
              value={imgAnswer}
              onChange={e => setImgAnswer(e.target.value)}
            />
            <button
              onClick={() => {
                if (imgAnswer.trim().toLowerCase() === "enigme") setImgSolved(true);
              }}
              style={{ marginLeft: 10 }}
            >
              Valider
            </button>
            {imgSolved && (
              <div style={{ color: "#00ffb3", marginTop: 10 }}>
                Bravo ! Passe à l'étape suivante.
                <button onClick={() => goToStep(5)} style={{ marginLeft: 10 }}>
                  Étape suivante
                </button>
              </div>
            )}
          </div>
        )}
        {step === 5 && (
          <div className="enigmes-zone">
            <h2>Énigme culturelle</h2>
            <p>
              Trouve la date de la prise de la Bastille (Révolution française).<br />
              (Format attendu : JJ/MM/AAAA)
            </p>
            <input
              type="text"
              placeholder="JJ/MM/AAAA"
              value={dateAnswer}
              onChange={e => setDateAnswer(e.target.value)}
            />
            <button
              onClick={() => {
                if (dateAnswer.trim() === "14/07/1789") setDateSolved(true);
              }}
              style={{ marginLeft: 10 }}
            >
              Valider
            </button>
            {dateSolved && (
              <div style={{ color: "#00ffb3", marginTop: 10 }}>
                Félicitations, tu as trouvé la clé finale : <b>1789BASTILLE</b>
              </div>
            )}
          </div>
        )}
      </main>
      <footer>
        <p>Bonne chance !</p>
      </footer>
    </div>
  );
}

export default App;
