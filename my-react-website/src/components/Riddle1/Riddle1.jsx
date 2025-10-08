import { useState, useEffect } from "react";
import Pacman from "react-pacman";
import "../../components/Riddle1/Riddle1.css";

export default function Challenge({ game, onWin }) {
  /* State to know if the game is started or not */
  const [playing, setPlaying] = useState(false);

  /* function to change the status of the state */
  const restartGame = () => {
    setPlaying(!playing);
  };

  /* Fonction appelée quand le joueur gagne */
  const handleWin = () => {
    setPlaying(false);
    // Appeler le callback parent si fourni
    if (onWin) {
      onWin();
    }
  };

  /* Fonction appelée quand le joueur perd */
  const handleLose = () => {
    setPlaying(false);
    alert("Perdu ! Réessayez !");
  };

  /* useEffect to disable/enable the scrolling on the page while the game is started/stopped */
  useEffect(() => {
    const disableScroll = () => {
      /* Hidding content that is displayed over the body */
      document.body.style.overflow = "hidden";
    };
    const enableScroll = () => {
      document.body.style.overflow = "auto";
    };
    if (playing === true) {
      disableScroll();
    } else {
      enableScroll();
    }
    /* Prevent eventuals troubles with the scrolling not being enable while needed */
    return () => {
      enableScroll();
    };
  }, [playing]);

  return (
    <div className={Styles.challenge}>
      <h2>Challenge : PAC MAN</h2>
      {playing ? (
        <Pacman 
          onEnd={() => setPlaying(false)}
          onWin={handleWin}
          onLose={handleLose}
          speed={70}           // Vitesse du jeu (50-100, plus petit = plus rapide)
          lives={3}            // Nombre de vies
          gridSize={20}        // Taille de la grille
          sound={true}         // Activer les sons
          // Personnaliser les couleurs (optionnel)
          colors={{
            wall: '#1919A6',
            pellet: '#FFFF00',
            powerPellet: '#FFFF00',
            pacman: '#FFFF00',
            ghost: '#FF0000'
          }}
        />
      ) : (
        <img
          className={Styles.challengeImg}
          src={game[0].image}
          alt={game[0].name}
        />
      )}
      <button type="button" className={Styles.playButton} onClick={restartGame}>
        <img className={Styles.playIcon} src={Play} alt="icone play" />
      </button>
      <p>{game[0].synopsis}</p>
    </div>
  );
}

Challenge.propTypes = {
  game: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      synopsis: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onWin: PropTypes.func, // Callback optionnel quand le joueur gagne
};