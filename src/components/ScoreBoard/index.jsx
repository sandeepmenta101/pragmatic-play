import { useEffect, useRef, useState } from "react";

import useGameContext from "../../reducers/GameContext";
import styles from "../styles.module.css";
export default function ScoreBoard() {
  const {
    totalAmount,
    startTimer,
    updateTimerStatus,
    isGameReset,
    selectedCards,
    resetGame
  } = useGameContext();
  const [countDown, setCountdown] = useState(10);
  const timerRef = useRef(null);

  const handleStartTimer = () => {
    clearInterval(timerRef.current);
    startTimer();
    timerRef.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  };

  useEffect(() => {
    if (countDown === 0) {
      updateTimerStatus();
      clearInterval(timerRef.current);
      setCountdown(0);
      if (!selectedCards.length) resetGame();
    }
  }, [countDown]);

  useEffect(() => {
    if (isGameReset) {
      setCountdown(10);
      clearInterval(timerRef.current);
    }
  }, [isGameReset]);

  return (
    <header className={styles.header}>
      <h1>Total Amount: ${totalAmount}</h1>
      <div>
        <button onClick={handleStartTimer}>Start Timer</button>
        <p>{countDown} Seconds</p>
      </div>
    </header>
  );
}
