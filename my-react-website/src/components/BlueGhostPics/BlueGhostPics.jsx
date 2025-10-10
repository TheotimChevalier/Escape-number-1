import { useState } from "react";
import KeyImage from "../Asset/Le-Code-Est-1234.webp";
import "./BlueGhostPics.css";

function BlueGhostPics({ onClose }) {
  const getSecretCode = () => {
    if (!KeyImage || typeof KeyImage !== "string") return null;
    const fileName = KeyImage.split("/").pop();
    const match = fileName.match(/Le-Code-Est-(\d+)/);
    return match ? match[1] : null;
  };

  const secretCode = getSecretCode();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!secretCode) {
      setMessage("❌ Erreur : Code introuvable");
      return;
    }
    if (code.trim() === secretCode) {
      setMessage("✅ Code correct ! Vous obtenez une partie du code final : Pics352 ");
    } else {
      setMessage("❌ Code incorrect !");
      setCode("");
    }
  };

  return (
    <>
      {/* Overlay (flou + fond noir semi-transparent) */}
      <div className="overlay" onClick={onClose}></div>

      {/* Fenêtre du modal */}
      <div className="container-image" onClick={(e) => e.stopPropagation()}>
        {/* Bouton de fermeture */}
        <button className="close-button" onClick={onClose}>
          ✖
        </button>

        <p>Devine le code secret :</p>

        <img
          className="image-wrong"
          src={KeyImage}
          alt="La clé mystérieuse"
        />

        <p className="description-key">
          La clé repose déjà entre tes mains... <br />
          Pourtant, tu ignores encore sa véritable nature. <br />
          Ce n'est qu'en l'appelant par son vrai nom <br />
          que la dernière porte acceptera de s'ouvrir.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="code-input-container">
            <input
              type="text"
              placeholder="Saisir le code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="code-input"
              autoFocus
            />

            <button type="submit" className="submit-button">
              Valider
            </button>

            {message && <p className="message">{message}</p>}
          </div>
        </form>
      </div>
    </>
  );
}

export default BlueGhostPics;
