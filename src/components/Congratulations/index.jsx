import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import styles from "../styles.module.css";
import useGameContext from "../../reducers/GameContext";

const Congratulations = () => {
  const {
    modalOpen,
    profit,
    bonusAmount,
    toggleModal,
    resetGame
  } = useGameContext();
  const timerId = useRef();

  useEffect(() => {
    if (modalOpen) {
      clearTimeout(timerId);
      timerId.current = setTimeout(() => {
        toggleModal();
        resetGame();
      }, 5000);
    }
  }, [modalOpen]);

  return modalOpen
    ? ReactDOM.createPortal(
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <img
              src={
                profit
                  ? "https://cdn-icons-png.flaticon.com/512/2228/2228739.png"
                  : "https://png.pngtree.com/png-vector/20190821/ourmid/pngtree-add-vector-icons-loss-charts-and-currency-values-dollar-dollar-png-image_1695292.jpg"
              }
              alt="Trophy"
            />
            <h2 className={profit ? styles.green : styles.red}>
              {profit
                ? `Congratulations! You won $ ${bonusAmount}`
                : "Sorry! You Loss"}
            </h2>
          </div>
        </div>,
        document.getElementById("modal-root")
      )
    : null;
};

export default Congratulations;
