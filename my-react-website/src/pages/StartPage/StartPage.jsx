import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/LogoPage/Logo";
import "../../styles/App.css";
import LogoImage from "../../components/LogoImage/LogoImage";

const MAX_SECONDS = 45 * 60; // 45 minutes

function PacManGame({ onWin }) {
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);

  const eatDot = () => {
    if (score < 4) setScore(score + 1);
    if (score + 1 === 5) {
      setWon(true);
      onWin && onWin();
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
      {won && (
        <div className="reward">
          Bravo, tu as gagné une clé : <b>PACKEY</b>
        </div>
      )}
    </div>
  );
}

function StartPage() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const intervalRef = useRef(null);
  const [codeInput, setCodeInput] = useState("");

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

  const formatTime = (s) =>
    `${String(Math.floor((MAX_SECONDS - s) / 60)).padStart(2, "0")}:${String(
      (MAX_SECONDS - s) % 60
    ).padStart(2, "0")}`;

  useEffect(() => {
    start();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (seconds >= MAX_SECONDS) {
      navigate("/game-over");
    }
  }, [seconds, navigate]);

  // Code secret
  const [showHidden, setShowHidden] = useState(false);
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "a") setShowHidden(true);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Validation du code
  const [showError, setShowError] = useState(false);
  const handleValidateCode = () => {
    const correctCode = "pacmiom-pikaboieriviere-Quizarcad-Pics352-pinkydark";

    if (codeInput.trim() === correctCode) {
      navigate("/felicitation");
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };

  return (
    
    <div className="escape-container">
      <header>
        <LogoImage/>
      </header>

      <div className="chrono-section">
        <div
          className={`chrono ${
            seconds >= MAX_SECONDS ? "chrono-finished" : ""
          }`}
        >
          {seconds < MAX_SECONDS ? formatTime(seconds) : "Temps écoulé !"}
        </div>

        <div className="code-input">
          <input
            type="text"
            placeholder="Entrez le code..."
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            /* pas de limite de caractères */
          />
          <button onClick={handleValidateCode} disabled={!codeInput}>
            Valider
          </button>
          <div className={`code-error ${showError ? "show" : ""}`}>
            Mauvais code — réessaie !
          </div>
        </div>
      </div>

      {/* Logo */}
      <Logo onLogoClick={(alt) => alert(`Tu as cliqué sur ${alt} ! 👻`)} />

      <main>
        {step === 0 && (
          <div className="enigmes-zone">
            <p>
              Bienvenue dans l'escape game !<br />
              Pour commencer, clique sur la clé pour révéler l'indice.
            </p>
            <p>
              <span
                style={{ fontSize: "2em", cursor: "pointer", marginLeft: 10 }}
                onClick={() => setShowHint(true)}
                role="img"
                aria-label="clé"
              >
                🔑
              </span>
            </p>
            {showHint && (
              <p className="indice">
                (Indice : cela a la même couleur que la clé)
              </p>
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

export default StartPage;
