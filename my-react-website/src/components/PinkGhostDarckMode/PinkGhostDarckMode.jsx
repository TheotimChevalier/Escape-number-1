import React, { useState, useEffect } from "react";
import "./PinkGhostDarckMode.css";

export default function PinkGhostDarckMode({ onClose }) {  // 👈 Ajoute la prop onClose ici
  const [darkMode, setDarkMode] = useState(false);
  // 👈 Supprime l'état visible, plus besoin !

  // Met à jour la classe du body pour le thème global
  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(darkMode ? "dark" : "light");
  }, [darkMode]);

  // 👈 Supprime le if (!visible) return null; — on affiche toujours tout quand monté

  return (
    <div className={`creative-page ${darkMode ? "dark" : "light"}`}>
      {/* Bouton Dark Mode */}
      <button
        className="toggle-btn"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          // ☀️ Soleil
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m8.485-8.485h1M4.515 12.515h1m12.02-6.02l.707-.707M6.758 17.243l.707-.707m12.02 6.02l-.707-.707M6.758 6.757l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
            />
          </svg>
        ) : (
          // 🌙 Lune
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
            />
          </svg>
        )}
      </button>

      {/* Bouton de fermeture ❌ — appelle maintenant onClose() */}
      <button
        className="close-btn"
        onClick={onClose}  // 👈 Change ça : appelle onClose au lieu de setVisible
        aria-label="Fermer la page"
      >
        ✕
      </button>

      {/* Contenu — toujours visible */}
      <div className="content">
        <h1>La Créativité : une lumière dans l’ombre</h1>
        <p>
          La créativité, c’est transformer l’ordinaire en extraordinaire.  
          C’est la capacité de voir au-delà des formes et des limites imposées
          par la logique.
        </p>

        {/* 🔒 Texte secret — visible uniquement en dark mode */}
        <p className={`hidden-text ${darkMode ? "show" : ""}`}>
          💡 Mot de passe secret : imagine2025
        </p>

        <p>
          Elle naît du silence, grandit dans l’ombre, et éclaire le monde par
          l’audace de ceux qui osent rêver autrement.
        </p>
      </div>
    </div>
  );
}
