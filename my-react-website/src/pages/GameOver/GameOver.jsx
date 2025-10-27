import React from 'react';
import { useNavigate } from 'react-router-dom';
import EpsiaGame from "../../components/EpsiaGame/EpsiaGame";
import "./GameOvercss.css";
export default function GameOver() {
  const navigate = useNavigate();

  return (
    <div className="escape-container">
      <header>
        <h1>EPSI-LON</h1>
      </header>

      <main className="game-over-screen">
        <h2 className="game-over-title">GAME OVER</h2>
        <p className="game-over-text">
          Le temps est écoulé...  
          <br />
          Mission échouée, mais pas perdue.  
          <br />
          Chaque erreur rapproche de la réussite.
        </p>
        <EpsiaGame/>

        <button className="retry-button" onClick={() => navigate('/')}>
          Réessayer
        </button>
      </main>
    </div>
  );
  
}
