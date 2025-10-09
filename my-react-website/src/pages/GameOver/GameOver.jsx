import React from 'react';

export default function GameOver() {
  return (
    <div className="escape-container">
      <header>
        <h1>Escape Game</h1>
      </header>
      <main className="game-over-screen">
        <h2>GAME OVER</h2>
        <p>Le temps est écoulé. Tu as perdu.</p>
      </main>
    </div>
  );
}
