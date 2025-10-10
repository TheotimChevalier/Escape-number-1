import { useState, useEffect } from "react";
import Pacman from "react-pacman";
import "../../components/PacMan/PacMan.css";

export default function PacMan({ onClose }) {
  const [visible, setVisible] = useState(true);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(1);
  const [showModal, setShowModal] = useState({ visible: false, title: "", message: "" });
  const [animateScore, setAnimateScore] = useState(false);

  // --- Fermer le composant ---
  const closeComponent = () => {
    if (typeof onClose === "function") onClose();
    else setVisible(false);
  };

  // --- Perdu ---
  const handleGameEnd = () => {
    setShowModal({
      visible: true,
      title: "Partie terminée 💀",
      message: `Partie terminée ! Score final : ${score}`,
    });
  };

  // --- Gagné ---
  const handleWin = () => {
    setShowModal({
      visible: true,
      title: "Bravo ! 🎉",
      message: `Félicitations ! Vous avez gagné !\n\n👥 Mes coéquipiers fantomes peuvent vous aider pour la suite 😉.`,
    });
  };

  // --- Simulation de victoire après 1 min 15 sec ---
  useEffect(() => {
    const timer = setTimeout(() => {
      handleWin();
    }, 75000); // 75 000 ms = 1 minute 15 secondes
    return () => clearTimeout(timer);
  }, []);

  // --- Gestion du score ---
  const handleScoreChange = (newScore) => {
    if (typeof newScore === "number") setScore(newScore);
    else if (newScore && typeof newScore === "object") {
      if (typeof newScore.score === "number") setScore(newScore.score);
      else if (typeof newScore.delta === "number") setScore((s) => s + newScore.delta);
    }
  };

  // --- Animation du score ---
  useEffect(() => {
    if (score == null) return;
    setAnimateScore(true);
    const t = setTimeout(() => setAnimateScore(false), 350);
    return () => clearTimeout(t);
  }, [score]);

  // --- Gestion des vies ---
  const handleLivesChange = (newLives) => {
    if (typeof newLives === "number") setLives(newLives);
    else if (newLives && typeof newLives === "object") {
      if (typeof newLives.lives === "number") setLives(newLives.lives);
      else if (typeof newLives.delta === "number")
        setLives((l) => Math.max(0, l + newLives.delta));
    }
  };

  // --- Si plus de vies → fin ---
  useEffect(() => {
    if (lives <= 0) {
      const t = setTimeout(() => handleGameEnd(), 250);
      return () => clearTimeout(t);
    }
  }, [lives]);

  // --- Fermer la popup ---
  const handleCloseModal = () => {
    setShowModal({ visible: false, title: "", message: "" });
    closeComponent();
  };

  // --- Bloquer le scroll du body ---
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={`pacman-container ${visible ? "show" : "hide"}`}>
      <div className="pacman-overlay" onClick={closeComponent} />

      <div className="pacman-modal" role="dialog" aria-modal="true">
        <button
          type="button"
          className="close-button"
          onClick={closeComponent}
          aria-label="Fermer"
        >
          ✕
        </button>

        <h2>🎮 Challenge : PAC MAN</h2>

        <div className="game-info">
          <p>Vies : <strong>{"❤️".repeat(Math.max(0, lives))}</strong></p>
        </div>

        <div className="game-area">
          {!showModal.visible && (
            <Pacman
              onEnd={handleGameEnd}
              onWin={handleWin}
              onScoreChange={handleScoreChange}
              onLivesChange={handleLivesChange}
              ghostSpeed={1.67}
              pacmanSpeed={0.1}   
              animate={!showModal.visible}
              level={1}
            />
          )}
        </div>

        <div className="game-instructions">
          <p>🕹️ Utilisez les <strong>flèches du clavier</strong> pour jouer</p>
          <p>⏱️ Vous avez <strong>1 minute 15 secondes</strong> pour tout manger !</p>
        </div>
      </div>

      {/* --- Popup de victoire / défaite --- */}
      {showModal.visible && (
        <>
          {/* Fond semi-transparent */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 10001,
            }}
            onClick={handleCloseModal}
          />

          {/* Fenêtre blanche centrée */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              color: "#000",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
              zIndex: 10002,
              maxWidth: "500px",
              width: "90%",
              textAlign: "center",
            }}
          >
            <h3>{showModal.title}</h3>
            <p style={{ whiteSpace: "pre-line" }}>{showModal.message}</p>
            <button
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "#ff4d4d",
                color: "white",
                cursor: "pointer",
                fontSize: "1rem",
              }}
              onClick={handleCloseModal}
            >
              Fermer
            </button>
          </div>
        </>
      )}
    </div>
  );
}
