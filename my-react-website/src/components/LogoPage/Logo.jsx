import React, { useState } from "react";
import "../../styles/App.css";

import pacman from "../../assets/pacman.svg";
import ghostRed from "../../assets/ghost-red.svg";
import ghostBlue from "../../assets/ghost-blue.svg";
import ghostPink from "../../assets/ghost-pink.svg";
import star from "../../assets/star.svg";
import heart from "../../assets/heart.svg";
import apple from "../../assets/apple.svg";

const logos = [
  { src: pacman, alt: "pacman", clickable: true },
  { src: ghostRed, alt: "fantome rouge", clickable: true },
  { src: ghostBlue, alt: "fantome bleu", clickable: true },
  { src: ghostPink, alt: "fantome rose", clickable: true },
  { src: star, alt: "etoile", clickable: false },
  { src: heart, alt: "coeur", clickable: false },
  { src: apple, alt: "pomme", clickable: false },
  // tu peux en rajouter autant que tu veux
];

export default function Logo({ step, goToStep }) {
  const [emojiSolved, setEmojiSolved] = useState(false);

  const handleClick = (alt) => {
    if (["pacman", "fantome rouge", "fantome bleu", "fantome rose"].includes(alt)) {
      alert(`Tu as cliqué sur ${alt} ! 👻`);
    }
  };

  return (
    <div className="page-container">
      {/* zone où les logos sont éparpillés */}
      <div className="logo-zone">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt}
            className={`logo ${logo.clickable ? "clickable" : ""}`}
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
            onClick={() => logo.clickable && handleClick(logo.alt)}
          />
        ))}
      </div>

      {/* ton énigme 1 */}
      {step === 1 && (
        <div className="enigmes-zone">
          <h2>Énigme 1 : Clique sur l'emoji</h2>
          <p>
            Pour avancer, il faut cliquer sur le bon emoji&nbsp;:
            <span
              style={{ fontSize: "2em", cursor: "pointer", marginLeft: 10 }}
              onClick={() => {
                setEmojiSolved(true);
                goToStep(2);
              }}
              role="img"
              aria-label="clé"
            >
              🔑
            </span>
          </p>
          <p>(Indice : ce n'est pas le bouton, mais l'emoji !)</p>
        </div>
      )}
    </div>
  );
}
