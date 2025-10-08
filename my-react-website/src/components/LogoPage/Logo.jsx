import React, { useState, useMemo } from "react";
import "../../styles/App.css";

// --- Icônes ---
import pacman from "../assets/pacman.svg";
import ghostRed from "../assets/ghost-red.svg";
import ghostBlue from "../assets/ghost-blue.svg";
import ghostPink from "../assets/ghost-pink.svg";
import ghostGreen from "../assets/ghost-green.svg";
import star from "../assets/star.svg";
import heart from "../assets/heart.svg";
import apple from "../assets/apple.svg";
import cherry from "../assets/cherry.svg";
import strawberry from "../assets/strawberry.svg";
import orangeFruit from "../assets/orange.svg";
import plum from "../assets/plum.svg";
import bell from "../assets/bell.svg";
import diamond from "../assets/diamond.svg";
import bomb from "../assets/bomb.svg";
import mushroom from "../assets/mushroom.svg";
import lightning from "../assets/lightning.svg";

// --- Composants pour les mini-jeux / quiz ---
import RedGhostQuiz from "../RedGhostQuiz/RedGhostQuiz";
import BlueGhostPics from "../BlueGhostPics/BlueGhostPics";
import PinkGhostDrackMode from "../PinkGhostDarckMode/PinkGhostDarckMode";
import GreenGhostRebut from "../GreenGhostRebut/GreenGhostRebut";
import PacMan from "../PacMan/PacMan"; // ton mini-jeu Pac-Man

const baseLogos = [
  { src: pacman, alt: "pacman", clickable: true, type: "pacman" },
  { src: ghostRed, alt: "fantome rouge", clickable: true, type: "red" },
  { src: ghostBlue, alt: "fantome bleu", clickable: true, type: "blue" },
  { src: ghostPink, alt: "fantome rose", clickable: true, type: "pink" },
  { src: ghostGreen, alt: "fantome vert", clickable: true, type: "green" },
  { src: star, alt: "etoile", clickable: false },
  { src: heart, alt: "coeur", clickable: false },
  { src: apple, alt: "pomme", clickable: false },
  { src: cherry, alt: "cerise", clickable: false },
  { src: strawberry, alt: "fraise", clickable: false },
  { src: orangeFruit, alt: "orange", clickable: false },
  { src: plum, alt: "prune", clickable: false },
  { src: bell, alt: "cloche", clickable: false },
  { src: diamond, alt: "diamant", clickable: false },
  { src: bomb, alt: "bombe", clickable: false },
  { src: mushroom, alt: "champignon", clickable: false },
  { src: lightning, alt: "eclair", clickable: false },
];

export default function Logo() {
  const [activeComponent, setActiveComponent] = useState(null); // "red", "blue", "pink", "green", "pacman"

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
      case "green":
        setActiveComponent("green");
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
      {activeComponent === "pink" && <PinkGhostDrackMode onClose={closeComponent} />}
      {activeComponent === "green" && <GreenGhostRebut onClose={closeComponent} />}
      {activeComponent === "pacman" && <PacMan onWin={closeComponent} />}
    </div>
  );
}
