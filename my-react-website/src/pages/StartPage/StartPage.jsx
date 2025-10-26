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
      {won && <div className="reward">Bravo, tu as gagné une clé : <b>PACKEY</b></div>}
    </div>
  );
}

function StartPage() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [pacmanWon, setPacmanWon] = useState(false);
  const [showHint, setShowHint] = useState(false); // révéler l'indice
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
    `${String(Math.floor((MAX_SECONDS - s) / 60)).padStart(2, "0")}:${String((MAX_SECONDS - s) % 60).padStart(2, "0")}`;

  // Démarrer automatiquement au montage
  useEffect(() => {
    start();
    return () => clearInterval(intervalRef.current);
  }, []);

  // Rediriger vers la page de game over quand le temps est écoulé
  useEffect(() => {
    if (seconds >= MAX_SECONDS) {
      navigate("/game-over");
    }
  }, [seconds, navigate]);

  // Contrôle A (code caché)
  const [showHidden, setShowHidden] = useState(false);
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "a") setShowHidden(true);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const goToStep = (n) => setStep(n);

  // Remplacer la validation automatique du code par une validation manuelle
  const [showError, setShowError] = useState(false);
  const handleValidateCode = () => {
    if (codeInput === "1234") {
      setCodeInput("");
      navigate("/felicitation");
    } else {
      setShowError(true);
      // masquer après 10 secondes
      setTimeout(() => setShowError(false), 10000);
    }
  };

  // --- Fonction pour retirer 3 minutes du temps restant ---
  const removeTimes = () => {
      // Ici, seconds = temps écoulé
      // donc on ajoute 180 secondes écoulées → le temps restant baisse de 3 minutes
  setSeconds((prevSeconds) => Math.min(prevSeconds + 180, MAX_SECONDS));
    };
  
  return (
    
    <div className="escape-container">
      <header>
        <LogoImage/>
      </header>

      <div className="chrono-section">
        <div className={`chrono ${seconds >= MAX_SECONDS ? "chrono-finished" : ""}`}>
          {seconds < MAX_SECONDS ? formatTime(seconds) : "Temps écoulé !"}
        </div>

        <div className="code-input">
          <input
            type="text"
            placeholder="Entrez le code..."
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            maxLength={10}
          />
          <button onClick={handleValidateCode} disabled={!codeInput}>Valider</button>
          <div className={`code-error ${showError ? 'show' : ''}`}>Mauvais code — réessaie !</div>
        </div>

        <div className="chrono-buttons">
          {/* contrôles désactivés */}
          <button disabled> Démarrer </button>
          <button disabled> Pause </button>
          <button disabled> Réinitialiser </button>
        </div>
      </div>

      {/* logo */}
      <Logo onGhostClick={removeTimes}/>

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
            {showHint && <p className="indice">(Indice : ce n'est pas un bouton, mais un emoji !)</p>}
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