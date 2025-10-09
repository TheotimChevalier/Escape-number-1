import ImageGuess from "../Asset/pas-cette-fois-petit-malin.jpg";
import "../OrangeGhostRebut/OrangeGhostRebut.css"

function OrangeGhostRebut() {
  return (
    <div className="container-OrangeGhost">
      <p>Devine ce que représente cette image :</p>
      <img 
        className="image-guess" 
        src={ImageGuess} 
        alt="La clé mystérieuse" 
      />
    </div>
  );
}

export default OrangeGhostRebut;
