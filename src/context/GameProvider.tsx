/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from "react";
import { Game } from "./game_interface";
import { GameContext } from "./GameContext";

// Initial game state
const initialState: Game = {
  score: 0,
  timeLeft: 40,
  melonsSlashed: 0,
  status: "stopped",
};

// Game actions
const actionTypes = {
  INCREASE_SCORE: "INCREASE_SCORE",
  DECREASE_TIMER: "DECREASE_TIMER",
  SLASH_MELON: "SLASH_MELON",
  RESET_GAME: "RESET_GAME",
  GAME_START: "GAME_START",
  GAME_OVER: "GAME_OVER",
};

// Reducer function to handle state updates
function gameReducer(
  state: Game,
  action: { type: string; payload?: any }
): Game {
  switch (action.type) {
    case actionTypes.INCREASE_SCORE:
      return { ...state, score: state.score + action.payload };
    case actionTypes.DECREASE_TIMER:
      return { ...state, timeLeft: state.timeLeft - 1 };
    case actionTypes.GAME_START:
      return { ...state, status: "playing" };
    case actionTypes.GAME_OVER:
      return { ...state, status: "over" };
    case actionTypes.SLASH_MELON:
      return {
        ...state,
        melonsSlashed: state.melonsSlashed + action.payload / 10,
        score: state.score + action.payload,
      };
    case actionTypes.RESET_GAME:
      return { ...initialState };
    default:
      return state;
  }
}

// GameProvider component to wrap around components that need access to game state
export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Action functions to update state
  const increaseScore = (points: number) =>
    dispatch({ type: actionTypes.INCREASE_SCORE, payload: points });

  const decreaseTimer = () => dispatch({ type: actionTypes.DECREASE_TIMER });
  const gameOver = () => dispatch({ type: actionTypes.GAME_OVER });
  const gameStart = () => dispatch({ type: actionTypes.GAME_START });
  const slashMelon = (points: number) =>
    dispatch({ type: actionTypes.SLASH_MELON, payload: points });
  const resetGame = () => dispatch({ type: actionTypes.RESET_GAME });

  return (
    <GameContext.Provider
      value={{
        ...state,
        increaseScore,
        decreaseTimer,
        slashMelon,
        resetGame,
        gameOver,
        gameStart,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
