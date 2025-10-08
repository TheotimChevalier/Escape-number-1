import React, { useState, useMemo } from "react";
import "../../styles/App.css";

// --- Icônes ---
import pacman from "../Asset/pacman.jfif";
import ghostRed from "../Asset/ghost-red.svg";
import ghostBlue from "../Asset/ghost-blue.svg";
import ghostPink from "../Asset/ghost-pink.svg";
import ghostOrange from "../Asset/ghost-orange.svg";
import star from "../Asset/star.svg";
import heart from "../Asset/heart.svg";
import apple from "../Asset/apple.svg";
import cherry from "../Asset/cherry.svg";
import strawberry from "../Asset/strawberry.svg";
import orangeFruit from "../Asset/orange.svg";
import plum from "../Asset/plum.svg";
import bell from "../Asset/bell.svg";
import diamond from "../Asset/diamond.svg";
import mushroom from "../Asset/mushroom.svg";
import lightning from "../Asset/lighting.svg";

// --- Composants pour les mini-jeux / quiz ---
import RedGhostQuiz from "../RedGhostQuiz/RedGhostQuiz";
import BlueGhostPics from "../BlueGhostPics/BlueGhostPics";
import PinkGhostDarckMode from "../PinkGhostDarckMode/PinkGhostDarckMode";
import OrangeGhostRebut from "../OrangeGhostRebut/OrangeGhostRebut";
import PacMan from "../PacMan/PacMan"; // ton mini-jeu Pac-Man

const baseLogos = [
  { src: pacman, alt: "pacman", clickable: true, type: "pacman" },
  { src: ghostRed, alt: "fantome rouge", clickable: true, type: "red" },
  { src: ghostBlue, alt: "fantome bleu", clickable: true, type: "blue" },
  { src: ghostPink, alt: "fantome rose", clickable: true, type: "pink" },
  { src: ghostOrange, alt: "fantome orange", clickable: true, type: "orange" },
  { src: star, alt: "etoile", clickable: false },
  { src: heart, alt: "coeur", clickable: false },
  { src: apple, alt: "pomme", clickable: false },
  { src: cherry, alt: "cerise", clickable: false },
  { src: strawberry, alt: "fraise", clickable: false },
  { src: orangeFruit, alt: "orange", clickable: false },
  { src: plum, alt: "prune", clickable: false },
  { src: bell, alt: "cloche", clickable: false },
  { src: diamond, alt: "diamant", clickable: false },
  { src: mushroom, alt: "champignon", clickable: false },
  { src: lightning, alt: "eclair", clickable: false },
];

export default function Logo() {
const [activeComponent, setActiveComponent] = useState(null);
  const [escapeRect, setEscapeRect] = useState(null);

  // On récupère la zone escape-container
  useEffect(() => {
    const container = document.querySelector(".escape-container");
    if (container) {
      setEscapeRect(container.getBoundingClientRect());
    }
  }, []);

  const randomized = useMemo(() => {
    return baseLogos.map((logo) => {
      let top, left;

      if (escapeRect) {
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        // Zone verticale au-dessus ou en dessous de escape-container
        const verticalZones = [
          { min: 0, max: escapeRect.top - 50 }, // au-dessus
          { min: escapeRect.bottom + 50, max: winHeight - 50 }, // en dessous
        ];
        const verticalZone = verticalZones[Math.floor(Math.random() * verticalZones.length)];
        top = Math.random() * (verticalZone.max - verticalZone.min) + verticalZone.min;

        // Zone horizontale à gauche ou à droite du escape-container
        const horizontalZones = [
          { min: 0, max: escapeRect.left - 50 }, // à gauche
          { min: escapeRect.right + 50, max: winWidth - 50 }, // à droite
        ];
        const horizontalZone = horizontalZones[Math.floor(Math.random() * horizontalZones.length)];
        left = Math.random() * (horizontalZone.max - horizontalZone.min) + horizontalZone.min;
      } else {
        top = Math.random() * 80 + 10;
        left = Math.random() * 80 + 10;
      }

      return {
        ...logo,
        top: `${top}px`,
        left: `${left}px`,
        size: `${Math.random() * 25 + 35}px`,
        rotation: `${Math.random() * 360}deg`,
      };
    });
  }, [escapeRect]);

  const handleClick = (logo) => {
    switch (logo.type) {
      case "red":
        setActiveComponent("red");
        break;
      case "blue":
        setActiveComponent("blue");
        break;
      case "pink":
        setActiveComponent("pink");
        break;
      case "orange":
        setActiveComponent("orange");
        break;
      case "pacman":
        setActiveComponent("pacman");
        break;
      default:
        alert(`Tu as cliqué sur ${logo.alt} ! 👻`);
    }
  };

  const closeComponent = () => setActiveComponent(null);

  return (
    <div className="logo-zone">
      {randomized.map((logo, i) => (
        <img
          key={i}
          src={logo.src}
          alt={logo.alt}
          className={`logo ${logo.clickable ? "clickable" : ""}`}
          style={{
            top: logo.top,
            left: logo.left,
            width: logo.size,
            transform: `rotate(${logo.rotation})`,
          }}
          onClick={() => logo.clickable && handleClick(logo)}
        />
      ))}

      {activeComponent === "red" && <RedGhostQuiz onClose={closeComponent} />}
      {activeComponent === "blue" && <BlueGhostPics onClose={closeComponent} />}
      {activeComponent === "pink" && <PinkGhostDarckMode onClose={closeComponent} />}
      {activeComponent === "orange" && <OrangeGhostRebut onClose={closeComponent} />}
      {activeComponent === "pacman" && <PacMan onWin={closeComponent} />}
    </div>
  );
}
