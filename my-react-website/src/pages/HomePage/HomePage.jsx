import React from 'react';
import { useState } from 'react';
import "./HomePage.css"; 
import ButtonRed from "../../components/ButonRed/ButtonRed"
import "../../styles/App.css";
// import Play from 'chemin/vers/play.png'; // Décommente et corrige le chemin si tu veux une icône

const HomePage = () => {
    const [showButtonRed, setShowButtonRed] = useState(false);

    const handleClick = () => {
      setShowButtonRed(true);
    };
    return (
        <div className="container_home">
            {/* Si tu veux afficher une image, décommente la ligne suivante et importe Play */}
            {/* <img className="playIcon" src={Play} alt="icone play" /> */}
            <h1>Bienvenue dans notre escape game</h1>
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
    );
};

export default HomePage;