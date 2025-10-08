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
  const [activeComponent, setActiveComponent] = useState(null); // "red", "blue", "pink", "orange", "pacman"

  const randomized = useMemo(() => {
    return baseLogos.map((logo) => ({
      ...logo,
      top: `${Math.random() * 85 + 5}%`,
      left: `${Math.random() * 85 + 5}%`,
      size: `${Math.random() * 25 + 35}px`,
      rotation: `${Math.random() * 360}deg`,
    }));
  }, []);

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
