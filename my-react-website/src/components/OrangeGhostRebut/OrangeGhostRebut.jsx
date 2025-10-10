import { useState } from "react";
import "./OrangeGhostRebut.css";

// 🖼️ Import des images
import ImageGuess from "../Asset/pas-cette-fois-petit-malin.jpg";
import Img1 from "../Asset/pikapng.png";
import Img2 from "../Asset/boiepng.png";
import Img3 from "../Asset/rivipng.png";
import Img4a from "../Asset/pikapng.png";
import Img4b from "../Asset/boiepng.png";
import Img4c from "../Asset/rivipng.png";

function OrangeGhostRebut({ onClose }) {
  const [dateInput, setDateInput] = useState("");
  const [isDateCorrect, setIsDateCorrect] = useState(false);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [validated, setValidated] = useState([false, false, false]); // validation des 3 premiers mots
  const [isRebusCorrect, setIsRebusCorrect] = useState(false);

  const correctDate = "14/07/1789";
  const correctAnswers = ["pikatchu", "boit dans la", "riviere", "pikatchu boit dans la riviere"];

  const handleDateSubmit = (e) => {
    e.preventDefault();
    if (dateInput.trim() === correctDate) setIsDateCorrect(true);
    else alert("❌ Ce n’est pas la bonne date !");
  };

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const validateWord = (index) => {
    if (answers[index].trim().toLowerCase() === correctAnswers[index].toLowerCase()) {
      const newValidated = [...validated];
      newValidated[index] = true;
      setValidated(newValidated);
      alert(`✅ Mot ${index + 1} correct !`);
    } else {
      alert(`❌ Mot ${index + 1} incorrect !`);
    }
  };

  const handleRebusSubmit = (e) => {
    e.preventDefault();
    if (answers[3].trim().toLowerCase() === correctAnswers[3].toLowerCase()) {
      setIsRebusCorrect(true);
      alert("🎉 Bravo ! Rébus complet correct !");
    } else {
      alert("❌ Le dernier mot est incorrect !");
    }
  };

  return (
    <div className="overlay">
      <div className="game-container">
        <button className="close-button" onClick={onClose}>✖</button>
        <div className="content">
          <p className="instruction-text">Entre la date mystère :</p>
          <img className="image-guess" src={ImageGuess} alt="Devine cette image" />

          {!isDateCorrect ? (
            <form onSubmit={handleDateSubmit}>
              <input
                type="text"
                placeholder="jj/mm/aaaa"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="date-input"
              />
              <button type="submit" className="validate-button">Valider</button>
            </form>
          ) : (
            <>
              <p className="instruction-text">Résous le rébus :</p>

              {/* 3 premiers mots avec bouton individuel */}
              <div className="rebus-stack">
                {[Img1, Img2, Img3].map((img, i) => (
                  <div className="rebus-item" key={i}>
                    <img src={img} alt={`rébus ${i+1}`} className="rebus-image" />
                    <input
                      type="text"
                      placeholder={`Mot ${i+1}`}
                      value={answers[i]}
                      onChange={(e) => handleChange(i, e.target.value)}
                      className="rebus-input"
                    />
                    {!validated[i] && (
                      <button
                        type="button"
                        className="validate-button"
                        onClick={() => validateWord(i)}
                      >
                        Valider Mot {i+1}
                      </button>
                    )}
                    {validated[i] && <span style={{color:'green'}}>✅ Correct</span>}
                  </div>
                ))}
              </div>

              {/* 4ème mot : 3 images ensemble */}
              <form onSubmit={handleRebusSubmit}>
                <div className="rebus-item">
                  <div className="multi-image">
                    <img src={Img4a} alt="pika" className="rebus-image-small" />
                    <img src={Img4b} alt="boi" className="rebus-image-small" />
                    <img src={Img4c} alt="rivi" className="rebus-image-small" />
                  </div>
                  <input
                    type="text"
                    placeholder="Phrase secrète"
                    value={answers[3]}
                    onChange={(e) => handleChange(3, e.target.value)}
                    className="rebus-input"
                  />
                  <button type="submit" className="validate-button">
                    Valider la phrase secrète
                  </button>
                </div>
              </form>

              {isRebusCorrect && <p className="success-message">🎉 Bravo ! Tu as trouvé toutes les bonnes réponses ! le code du fantome orange est : Pikaboieriviere </p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrangeGhostRebut;
