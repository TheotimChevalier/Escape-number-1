import React from 'react';
import "./styles/HomePage.css"; 
import "./styles/App.css"

const HomePage = () => {
    return (
        <div>
            <img className={Styles.playIcon} src={Play} alt="icone play" />
            <h1>Bienvenue dans notre escape game</h1>
            <button 
            type="button" class="red_button" onClick={restartGame}>Démarrer
            </button>
        </div>
    );
};

export default HomePage;