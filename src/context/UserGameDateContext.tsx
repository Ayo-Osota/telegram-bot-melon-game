import { createContext, useContext } from "react";
import { IGameStatsContext } from "./game_interface";

// Create a context
export const UserGameDataContext = createContext<IGameStatsContext | null>(
  null
);

// Create a custom hook to use the UserGameDataContext
export const useUserGameData = () => {
  const context = useContext(UserGameDataContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
