import { useContext, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { ANIMALS_CARDS } from './constants';
import JSConfetti from 'js-confetti';
import { GameContext } from '../../contexts/GameContext';

const Cards = () => {
  const { isActive, handleStart, handleStop, handleReset } = useContext(GameContext);
  const [flippedCards, setFlippedCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [resetting, setResetting] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const confetti = new JSConfetti();

  const CARDS = 8;
  const numbersOfCards = [];

  for (let i = 1; i <= CARDS; i++) {
    numbersOfCards.push(i);
  }

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    setShuffledCards(shuffle([...numbersOfCards, ...numbersOfCards]));
  }, []);

  const handleClick = (e, card) => {
    e.preventDefault();
    const cardElement = e.currentTarget;

    if (cardElement.classList.contains(styles["card--flipped"])) {
      return;
    }

    if (!isActive) {
      console.log('empieza el counter');
      handleStart();
    }

    cardElement.classList.toggle(styles["card--flipped"]);

    setFlippedCards([...flippedCards, { card, element: cardElement }]);

    if (flippedCards.length === 1) {
      const [firstCard] = flippedCards;

      if (firstCard.card !== card) {
        setTimeout(() => {
          cardElement.classList.toggle(styles["card--flipped"]);
          firstCard.element.classList.toggle(styles["card--flipped"]);
        }, 600);
      } else {
        setMatchedCards([...matchedCards, card, firstCard.card]);
      }
      return setFlippedCards([]);
    }
  };

  const resetGame = () => {
    setResetting(true);
    handleReset();
    setTimeout(() => {
      resetCards();
      setResetting(false);
      setShowButton(false);
    }, 500);
  };

  const resetCards = () => {
    setFlippedCards([]);
    setMatchedCards([]);
    setShuffledCards(shuffle([...numbersOfCards, ...numbersOfCards]));
  }

  const confettiTime = () => {
    if (matchedCards.length > 0 && matchedCards.length === shuffledCards.length) {
      handleStop();
      const rounds = 3;

      // rounds of confetti
      for (let i = 1; i <= rounds; i++) {
        setTimeout(() => {
          confetti.addConfetti();
        }, i * 1000);
      }
      // show button "Play again" after 3 seconds
      setTimeout(() => {
        setShowButton(true);
      }, 2000);
    }
  };

  useEffect(() => {
    confettiTime();
  }, [matchedCards, shuffledCards.length]);

  return (
    <div className={styles["container"]}>
      <div className={styles["view-container"]}>
        <div className={styles["cards-container"]}>
          {shuffledCards.map((card, index) => {
            const animalCard = ANIMALS_CARDS.find(animal => animal.id === card);
            return (
              <div
                key={index}
                className={`${styles.card} ${resetting ? styles["card--reset"] : ""}`}
                onClick={(e) => handleClick(e, card)}
              >
                <div className={styles["card-inner"]}>
                  <div
                    className={styles["card-front"]}
                    style={{ backgroundColor: 'transparent' }}>
                    {/* {card} */}
                  </div>
                  <div
                    className={styles["card-back"]}
                    style={{ backgroundColor: animalCard.color }}
                  >
                    {animalCard.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showButton && (
        <div className={styles["button-container"]}>
          <button onClick={resetGame} className={styles.button}>Play again</button>
        </div>
      )}
    </div>
  );
};

export default Cards;