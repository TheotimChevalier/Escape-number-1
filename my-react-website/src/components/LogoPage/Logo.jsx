import React, { useState, useMemo, useEffect } from "react";
import "../../styles/App.css";

// --- Icônes ---
import pacman from "../Asset/pacman.png";
import ghostRed from "../Asset/ghost-red.svg";
import ghostBlue from "../Asset/ghost-blue.svg";
import ghostPink from "../Asset/ghost-pink.svg";
import ghostOrange from "../Asset/ghost-orange.svg";
import star from "../Asset/star.svg";
import apple from "../Asset/apple.svg";
import cherry from "../Asset/cherry.svg";
import strawberry from "../Asset/strawberry.svg";
import orangeFruit from "../Asset/orange.svg";
import orangeHeart from "../Asset/orange-heart.svg";
import plum from "../Asset/plum.svg";
import bell from "../Asset/bell.svg";
import diamond from "../Asset/diamond.svg";
import mushroom from "../Asset/mushroom.svg";
import lightning from "../Asset/lighting.svg";
import avocado from "../Asset/avocado.svg";
import angry from "../Asset/angry.svg";
import blueHeart from "../Asset/blue-heart.svg";
import bulbBlue from "../Asset/blue-bulb.svg";
import blueFlower from "../Asset/blue-flower.svg";
import blueLike from "../Asset/blue-like.svg";
import blueRowRight from "../Asset/blue-row-right.svg";
import blueStar from "../Asset/blue-star.svg";
import books from "../Asset/books.svg";
import blueMonkey from "../Asset/blue-monkey.svg";
import blueUnicorn from "../Asset/blue-unicorn.svg";
import carrot from "../Asset/carrot.svg";
import greenCheck from "../Asset/check.svg";
import greenGrapes from "../Asset/green-grapes.svg";
import greenThumb from "../Asset/green-thumb.svg";
import purpleUnicorn from "../Asset/purple-unicorn.svg";
import cloud from "../Asset/cloud.svg";
import redDevil from "../Asset/devil.svg";
import eyes from "../Asset/eyes.svg";
import freezeEmoji from "../Asset/freeze-emoji.svg";
import ghostEmoji from "../Asset/ghost-emoji.svg";
import greenApple from "../Asset/green-apple.svg";
import greenHeart from "../Asset/green-heart.svg";
import heartSticker from "../Asset/heart-sticker.svg";
import kiwi from "../Asset/kiwi.svg";
import koFace from "../Asset/ko-face.svg";
import litchi from "../Asset/litchi.svg";
import pinkLego from "../Asset/lego.svg";
import moon from "../Asset/moon.svg";
import marioKart from "../Asset/mario-kart.svg";
import pinkNode from "../Asset/node.svg";
import orangeCat from "../Asset/orange-cat.svg";
import orangeMonkey from "../Asset/orange-monkey.svg";
import peach from "../Asset/peach.svg";
import pear from "../Asset/pear.svg";
import pinkHeart from "../Asset/pink-heart.svg";
import pinkFire from "../Asset/pink-fire.svg";
import pinkFace from "../Asset/pink-face.svg";
import pinkRabbit from "../Asset/pink-rabbit.svg";
import pokeball from "../Asset/pokeball.svg";
import playGreen from "../Asset/play.svg";
import rainy from "../Asset/rainy.svg";
import redThumb from "../Asset/red-thumb.svg";
import storm from "../Asset/storm.svg";
import surpriseBox from "../Asset/surprise-box.svg";
import tomato from "../Asset/tomato.svg";
import treasureChest from "../Asset/treasure-chest.svg";
import watermelon from "../Asset/watermelon.svg";
import water from "../Asset/water.svg";

// --- Composants pour les mini-jeux / quiz ---
import RedGhostQuiz from "../RedGhostQuiz/RedGhostQuiz";
import BlueGhostPics from "../BlueGhostPics/BlueGhostPics";
import PinkGhostDarckMode from "../PinkGhostDarckMode/PinkGhostDarckMode";
import OrangeGhostRebut from "../OrangeGhostRebut/OrangeGhostRebut";
import PacMan from "../PacMan/PacMan"; // mini-jeu Pac-Man

// --- Liste des icônes ---
const baseLogos = [
  { src: pacman, alt: "pacman", clickable: true, type: "pacman" },
  { src: ghostRed, alt: "fantome rouge", clickable: true, type: "red" },
  { src: ghostBlue, alt: "fantome bleu", clickable: true, type: "blue" },
  { src: ghostPink, alt: "fantome rose", clickable: true, type: "pink" },
  { src: ghostOrange, alt: "fantome orange", clickable: true, type: "orange" },
  { src: star, alt: "etoile", clickable: false },
  { src: apple, alt: "pomme rouge", clickable: false },
  { src: cherry, alt: "cerise", clickable: false },
  { src: strawberry, alt: "fraise", clickable: false },
  { src: orangeFruit, alt: "orange", clickable: false },
  { src: plum, alt: "prune", clickable: false },
  { src: bell, alt: "cloche verte", clickable: false },
  { src: diamond, alt: "diamant bleu", clickable: false },
  { src: mushroom, alt: "champignon", clickable: false },
  { src: lightning, alt: "eclair bleu", clickable: false },
  { src: angry, alt: "smiley en colère", clickable: false },
  { src: avocado, alt: "avocat", clickable: false },
  { src: blueHeart, alt: "coeur bleu", clickable: false },
  { src: bulbBlue, alt: "ampoule bleue", clickable: false },
  { src: blueMonkey, alt: "singe bleu", clickable: false },
  { src: blueUnicorn, alt: "licorne bleue", clickable: false },
  { src: carrot, alt: "carotte", clickable: false },
  { src: greenCheck, alt: "coche verte", clickable: false },
  { src: cloud, alt: "nuage", clickable: false },
  { src: redDevil, alt: "diable rouge", clickable: false },
  { src: eyes, alt: "yeux", clickable: false },
  { src: freezeEmoji, alt: "emoji gelé", clickable: false },
  { src: ghostEmoji, alt: "emoji fantome", clickable: false },
  { src: greenApple, alt: "pomme verte", clickable: false },
  { src: heartSticker, alt: "coeur sticker", clickable: false },
  { src: kiwi, alt: "kiwi", clickable: false },
  { src: pinkLego, alt: "lego rose", clickable: false },
  { src: moon, alt: "lune", clickable: false },
  { src: pinkNode, alt: "noeud rose", clickable: false },
  { src: orangeCat, alt: "chat orange", clickable: false },
  { src: orangeHeart, alt: "coeur orange", clickable: false },
  { src: peach, alt: "pêche", clickable: false },
  { src: pear, alt: "poire", clickable: false },
  { src: pinkHeart, alt: "coeur rose", clickable: false },
  { src: pinkRabbit, alt: "lapin rose", clickable: false },
  { src: playGreen, alt: "bouton play", clickable: false },
  { src: rainy, alt: "pluie", clickable: false },
  { src: redThumb, alt: "pouce rouge", clickable: false },
  { src: surpriseBox, alt: "boîte surprise", clickable: false },
  { src: tomato, alt: "tomate", clickable: false },
  { src: treasureChest, alt: "coffre au trésor", clickable: false },
  { src: watermelon, alt: "pastèque", clickable: false },
  { src: greenGrapes, alt: "raisins verts", clickable: false },
  { src: marioKart, alt: "kart", clickable: false },
  { src: pinkFire, alt: "feu rose", clickable: false },
  { src: blueFlower, alt: "fleur bleue", clickable: false },
  { src: orangeMonkey, alt: "singe orange", clickable: false },
  { src: water, alt: "eau", clickable: false },
  { src: storm, alt: "orage", clickable: false },
  { src: greenHeart, alt: "coeur vert", clickable: false },
  { src: litchi, alt: "litchi", clickable: false },
  { src: blueRowRight, alt: "flèche droite", clickable: false },
  { src: books, alt: "livres", clickable: false },
  { src: greenThumb, alt: "pouce vert", clickable: false },
  { src: pokeball, alt: "pokeball", clickable: false },
  { src: pinkFace, alt: "visage rose", clickable: false },
  { src: blueStar, alt: "étoile bleue", clickable: false },
  { src: blueLike, alt: "like bleu", clickable: false },
  { src: koFace, alt: "tête KO", clickable: false },
  { src: purpleUnicorn, alt: "licorne violette", clickable: false },
];

// --- Fonction de vérification de chevauchement ---
function isOverlapping(a, b) {
  return !(
    a.left + a.size < b.left ||
    a.left > b.left + b.size ||
    a.top + a.size < b.top ||
    a.top > b.top + b.size
  );
}

export default function Logo() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [escapeRect, setEscapeRect] = useState(null);

  useEffect(() => {
    const container = document.querySelector(".escape-container");
    if (container) setEscapeRect(container.getBoundingClientRect());
  }, []);

  const randomized = useMemo(() => {
    if (!escapeRect) return [];

    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const placed = [];

    for (const logo of baseLogos) {
      let top = 0, left = 0;
      const size = Math.random() * 25 + 35;
      let positionValid = false, attempt = 0;

      while (!positionValid && attempt < 200) {
        attempt++;
        const zone = Math.floor(Math.random() * 4);
        switch (zone) {
          case 0: top = Math.random() * (escapeRect.top - size); left = Math.random() * winWidth; break;
          case 1: top = escapeRect.bottom + Math.random() * (winHeight - escapeRect.bottom - size); left = Math.random() * winWidth; break;
          case 2: top = Math.random() * winHeight; left = Math.random() * (escapeRect.left - size); break;
          case 3: top = Math.random() * winHeight; left = escapeRect.right + Math.random() * (winWidth - escapeRect.right - size); break;
          default: break;
        }

        top = Math.max(0, Math.min(winHeight - size, top));
        left = Math.max(0, Math.min(winWidth - size, left));

        const current = { top, left, size };
        positionValid = !placed.some((p) => isOverlapping(p, current));
        if (positionValid) placed.push(current);
      }
    }

    return placed.map((pos, i) => ({
      ...baseLogos[i],
      top: `${pos.top}px`,
      left: `${pos.left}px`,
      size: `${pos.size}px`,
      rotation: `${Math.random() * 360}deg`,
    }));
  }, [escapeRect]);

  const handleClick = (logo) => {
    switch (logo.type) {
      case "red": setActiveComponent("red"); break;
      case "blue": setActiveComponent("blue"); break;
      case "pink": setActiveComponent("pink"); break;
      case "orange": setActiveComponent("orange"); break;
      case "pacman": setActiveComponent("pacman"); break;
      default: alert(`Tu as cliqué sur ${logo.alt} ! 👻`);
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
          className="logo"
          style={{
            top: logo.top,
            left: logo.left,
            width: logo.size,
            transform: `rotate(${logo.rotation})`,
            cursor: "default", // empêche la main
          }}
          onClick={() => logo.clickable && handleClick(logo)}
        />
      ))}

      {activeComponent === "red" && <RedGhostQuiz onClose={closeComponent} />}
      {activeComponent === "blue" && <BlueGhostPics onClose={closeComponent} />}
      {activeComponent === "pink" && <PinkGhostDarckMode onClose={closeComponent} />}
      {activeComponent === "orange" && <OrangeGhostRebut onClose={closeComponent} />}
      {activeComponent === "pacman" && <PacMan onClose={closeComponent} />}
    </div>
  );
}
