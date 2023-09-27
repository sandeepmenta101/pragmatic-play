import { useEffect } from "react";

import styles from "../styles.module.css";
import useGameContext from "../../reducers/GameContext";

export default function Card() {
  const {
    cards,
    addSelectedCards,
    totalAmount,
    startedTimer,
    handleAmountChange,
    updateTheBetAmount,
    resetGame
  } = useGameContext();

  const handleChange = (e, card) => {
    const { value } = e.target;
    if (Number(value) > totalAmount) {
      alert("Bet amount should be lesser than your total amount");
      return;
    }

    handleAmountChange({ ...card, amount: Number(value) });
  };

  const handleBlur = (e) => {
    const { value } = e.target;
    updateTheBetAmount(Number(value));
  };

  const handleCardClick = (e, card) => {
    if (e.target.tagName !== "INPUT") addSelectedCards(card);
  };

  useEffect(() => {
    if (totalAmount <= 0) {
      alert(
        "The Bet amount is greater than you total amount. Resetting the board"
      );
      resetGame();
      return;
    }
  }, [totalAmount]);

  return (
    <section className={styles.container}>
      {cards && cards?.length > 0 ? (
        cards.map((card, i) => (
          <article
            key={i}
            className={`${styles.card} ${
              card.selected ? `${styles.active}` : ""
            } ${
              startedTimer ? `${styles.clickable}` : `${styles.unClickable}`
            }`}
            onClick={(e) => startedTimer && handleCardClick(e, card)}
          >
            <h2>{card.number}</h2>
            <input
              type="text"
              name="betAmount"
              onChange={(e) => handleChange(e, card)}
              placeholder="Bet Amount"
              disabled={!card.selected}
              onBlur={handleBlur}
              value={card.amount}
            />
          </article>
        ))
      ) : (
        <h1>No Cards</h1>
      )}
    </section>
  );
}
