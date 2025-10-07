import React from 'react';
import "./HomePage.css"; 
import "../../styles/App.css";
// import Play from 'chemin/vers/play.png'; // Décommente et corrige le chemin si tu veux une icône

const HomePage = () => {
    return (
        <div>
            {/* Si tu veux afficher une image, décommente la ligne suivante et importe Play */}
            {/* <img className="playIcon" src={Play} alt="icone play" /> */}
            <h1>Bienvenue dans notre escape game</h1>
            <button 
                type="button" 
                className="red_button"
                // onClick={restartGame} // Décommente et définis restartGame si tu veux une action
            >
                Démarrer
            </button>
        </div>
    );
};

export default HomePage;