import cards from "../database";

export const GameInitialState = {
  totalAmount: 100,
  cards: [...cards],
  selectedCards: [],
  startedTimer: false,
  rolledDice: 0,
  isTimerDone: false,
  profit: false,
  bonusAmount: 0,
  toggleModal: false,
  isGameReset: false,
};

export const ACTION_TYPES = {
  START_GAME: "START_GAME",
  ADD_SELECTED_CARDS: "ADD_SELECTED_CARDS",
  START_TIMER: "START_TIMER",
  HANDLE_INPUT_CHANGE: "HANDLE_INPUT_CHANGE",
  ROLLED_DICE_NUMER: "ROLLED_DICE_NUMER",
  IS_TIMER_DONE: "IS_TIMER_DONE",
  UPDATE_THE_BET_AMOUNT: "UPDATE_THE_BET_AMOUNT",
  TOGGLE_MODAL: "TOGGLE_MODAL",
  RESET_GAME: "RESET_GAME",
};

const GameReducer = (state = GameInitialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_SELECTED_CARDS: {
      const selectedCards = [...state.selectedCards];
      let balanceAmount = state.totalAmount;
      const oldCards = state.cards.map((card) => {
        if (card.number === action.payload.number) {
          if (card.selected) {
            selectedCards.pop();
            balanceAmount = state.totalAmount + 1 + card.amount;
          } else {
            selectedCards.push(action.payload);
            balanceAmount = state.totalAmount - 1 - card.amount;
          }
          return {
            ...card,
            selected: !card.selected,
            amount: !card.selected ? card.amount : 0,
          };
        }
        return card;
      });
      return {
        ...state,
        totalAmount: balanceAmount,
        cards: oldCards,
        selectedCards,
      };
    }
    case ACTION_TYPES.START_TIMER:
      return {
        ...state,
        startedTimer: !state.startedTimer,
        isGameReset: false,
      };
    case ACTION_TYPES.HANDLE_INPUT_CHANGE: {
      const oldCards = state.cards.map((card) => {
        if (card.number === action.payload.number && action.payload.selected) {
          return { ...action.payload };
        }
        return card;
      });
      return {
        ...state,
        cards: oldCards,
      };
    }
    case ACTION_TYPES.ROLLED_DICE_NUMER:
      const selectedCards = [...state.cards];
      let sumOfAmounts = 0;
      let wonCards = selectedCards.filter((card) => {
        if (card.number === action.payload) {
          return card;
        }
        return false;
      });
      if (wonCards.length > 0) {
        wonCards = wonCards.map((card) => card.amount * 2);
        sumOfAmounts = wonCards.reduce((a, b) => a + b, 0);
      }
      return {
        ...state,
        rolledDice: action.payload,
        totalAmount: state.totalAmount + sumOfAmounts,
        bonusAmount: sumOfAmounts,
        profit: sumOfAmounts > 0,
      };
    case ACTION_TYPES.IS_TIMER_DONE:
      return {
        ...state,
        isTimerDone: true,
        startedTimer: false,
      };
    case ACTION_TYPES.UPDATE_THE_BET_AMOUNT: {
      const balanceAmount = state.totalAmount - action.payload;
      return {
        ...state,
        totalAmount: balanceAmount,
      };
    }
    case ACTION_TYPES.TOGGLE_MODAL:
      return {
        ...state,
        toggleModal: !state.toggleModal,
      };
    case ACTION_TYPES.RESET_GAME:
      return {
        ...state,
        isGameReset: true,
        cards: [...cards],
        selectedCards: [],
        startedTimer: false,
        rolledDice: 0,
        isTimerDone: false,
        profit: false,
        bonusAmount: 0,
        toggleModal: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default GameReducer;
