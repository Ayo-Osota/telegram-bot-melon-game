export interface Game {
  score: number;
  timeLeft: number;
  melonsSlashed: number;
  status: "stopped" | "playing" | "over";
}

export interface GameStats {
  tickets: number;
  score: number;
  level: number;
  melonsSlashed: number;
  error?: string;
  user_id?: number;
}

export interface IGameStatsContext {
  userGameData: GameStats;
  fetchUserGameData: () => void;
  sendUserGameData: (gameData: GameStats) => void;
}

export interface GameContextType {
  score: number;
  timeLeft: number;
  melonsSlashed: number;
  status: "stopped" | "playing" | "over";
  increaseScore: (points: number) => void;
  decreaseTimer: () => void;
  slashMelon: (points: number) => void;
  resetGame: () => void;
  gameStart: () => void;
  gameOver: () => void;
}
