import { useEffect, useRef } from "react";

import useGameContext from "../../reducers/GameContext";
import styles from "../styles.module.css";
import { getRandomNumberInDice } from "../../utils/Helper";

export default function Dice() {
  const {
    rolledDice,
    randomRolledDice,
    isTimerDone,
    toggleModal,
    isGameReset,
  } = useGameContext();
  const timerId = useRef(null);
  const modalTimerId = useRef(null);

  useEffect(() => {
    if (!isGameReset) {
      if (isTimerDone) {
        clearTimeout(timerId.current);
        timerId.current = setTimeout(() => {
          const randomNumber = getRandomNumberInDice();
          randomRolledDice(randomNumber);
        }, 2000);
        clearTimeout(modalTimerId.current);
        modalTimerId.current = setTimeout(() => {
          toggleModal();
        }, 4000);
      }
    }
  }, [isTimerDone, isGameReset]);

  if (!isTimerDone) return null;

  return (
    <article className={styles.dice}>
      <h2>{rolledDice}</h2>
    </article>
  );
}
