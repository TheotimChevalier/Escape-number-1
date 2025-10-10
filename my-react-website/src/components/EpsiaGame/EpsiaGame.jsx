import { useNavigate } from "react-router-dom"; 
import "../../components/EpsiaGame/EpsiaGame.css"
import epsiaGame from "../Asset/epsia-game.png"; 
export default function EpsiaGame() {
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    navigate("/epsia-game");
  };

  return ( // ⬅️ AJOUTÉ : return manquant
    <div className="partenariat-container">
      <img src={epsiaGame} alt="Image du prochain jeu" className="epsia-img" />
      <button
        type="button"
        className="submit-button"
        onClick={handleSubmit}
      >
        🎮 Découvrir le prochain jeu
      </button>
    </div>
  );
}