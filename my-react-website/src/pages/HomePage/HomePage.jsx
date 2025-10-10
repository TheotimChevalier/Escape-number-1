import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./HomePage.css";
import ButtonRed from "../../components/ButonRed/ButtonRed";
import "../../styles/App.css";
import LogoImage from "../../components/LogoImage/LogoImage";

const HomePage = () => {
  const [showButtonRed, setShowButtonRed] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowButtonRed(true);
  };

  return (
    <div className="container-center">
      <div className="container_home">
        <LogoImage/>
        {/* Si tu veux afficher une image, décommente la ligne suivante et importe Play */}
        {/* <img className="playIcon" src={Play} alt="icone play" /> */}
        <h1>Bienvenue dans notre escape game</h1>
        Pour commencer la première étape,{" "}
        <a href="/start" className="non-underline"> cliquez ici</a>
        <div>
          <button
            type="button"
            className="red_button"
            onClick={handleClick}
          >
            Démarrer
          </button>
          {showButtonRed && <ButtonRed />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
