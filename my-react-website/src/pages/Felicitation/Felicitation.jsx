import React from 'react';
import EpsiaGame from "../../components/EpsiaGame/EpsiaGame";
import LogoImage from "../../components/LogoImage/LogoImage"

export default function Felicitation() {

  return (
    <div className="escape-container">
      <header>
        <LogoImage/>
      </header>
      <main className="felicitation-screen">
        <h2>🎉 Félicitations 🎉</h2>
        <p>Vous avez réussi l'escape game !</p>
        <EpsiaGame/>
      </main>
    </div>
  );
}