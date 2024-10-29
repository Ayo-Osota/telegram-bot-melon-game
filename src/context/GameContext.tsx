import { createContext, useContext } from "react";
import { GameContextType } from "./game_interface";

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

// Custom hook to use GameContext
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
