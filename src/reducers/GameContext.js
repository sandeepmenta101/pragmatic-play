import { createContext, useReducer, useContext } from "react";

import GameReducer, { GameInitialState, ACTION_TYPES } from "./GameReducer";

const GameContext = createContext(GameInitialState);

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GameReducer, GameInitialState);

  const addSelectedCards = (selectedCards) => {
    dispatch({ type: ACTION_TYPES.ADD_SELECTED_CARDS, payload: selectedCards });
  };

  const startTimer = () => {
    dispatch({ type: ACTION_TYPES.START_TIMER });
  };

  const handleAmountChange = (card) => {
    dispatch({ type: ACTION_TYPES.HANDLE_INPUT_CHANGE, payload: card });
  };

  const randomRolledDice = (randomNumber) => {
    dispatch({ type: ACTION_TYPES.ROLLED_DICE_NUMER, payload: randomNumber });
  };

  const updateTimerStatus = () => {
    dispatch({ type: ACTION_TYPES.IS_TIMER_DONE });
  };

  const updateTheBetAmount = (amount) => {
    dispatch({ type: ACTION_TYPES.UPDATE_THE_BET_AMOUNT, payload: amount });
  };

  const toggleModal = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_MODAL });
  };

  const resetGame = () => {
    dispatch({ type: ACTION_TYPES.RESET_GAME });
  };

  const value = {
    cards: state.cards,
    totalAmount: state.totalAmount,
    selectedCards: state.selectedCards,
    startedTimer: state.startedTimer,
    rolledDice: state.rolledDice,
    isTimerDone: state.isTimerDone,
    profit: state.profit,
    modalOpen: state.toggleModal,
    bonusAmount: state.bonusAmount,
    timerCountdown: state.timerCountdown,
    isGameReset: state.isGameReset,
    addSelectedCards,
    startTimer,
    handleAmountChange,
    randomRolledDice,
    updateTimerStatus,
    updateTheBetAmount,
    toggleModal,
    resetGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

const useGameContext = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGameContext must be used within GameContext");
  }

  return context;
};

export default useGameContext;
