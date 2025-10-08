import { useState, useEffect } from "react";
import Pacman from "react-pacman";
import "../../components/PacMan/PacMan.css"

export default function PacMan({ onClose }) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  /* Gérer la fin du jeu */
  const handleGameEnd = () => {
    alert(`Partie terminée ! Score final : ${score}`);
  };

  /* Gérer la victoire */
  const handleWin = () => {
    alert(`Bravo ! Vous avez gagné avec un score de ${score} !`);
  };

  /* Gérer le changement de score */
  const handleScoreChange = (newScore) => {
    setScore(newScore);
  };

  /* Gérer le changement de vies */
  const handleLivesChange = (newLives) => {
    setLives(newLives);
  };

  /* useEffect pour désactiver le scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {/* Fond sombre derrière le jeu */}
      <div className="pacman-overlay" onClick={onClose}></div>
      
      {/* Fenêtre du jeu au premier plan */}
      <div className="pacman-modal">
        {/* Bouton de fermeture */}
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        <h2>🎮 Challenge : PAC MAN</h2>
        
        {/* Affichage du score et des vies */}
        <div className="game-info">
          <p>Score : <strong>{score}</strong></p>
          <p>Vies : <strong>{"❤️".repeat(lives)}</strong></p>
        </div>

        {/* Zone de jeu */}
        <div className="game-area">
          <Pacman 
            onEnd={handleGameEnd}
            onWin={handleWin}
            onScoreChange={handleScoreChange}
            onLivesChange={handleLivesChange}
            ghostSpeed={1.67}
            pacmanSpeed={0.1}
            animate={true}
            level={1}
          />
        </div>

        {/* Instructions */}
        <div className="game-instructions">
          <p>🕹️ Utilisez les <strong>flèches du clavier</strong> pour jouer</p>
        </div>
      </div>
    </>
  );
}
