/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useTelegram } from "./TelegramContext";
import { UserGameDataContext } from "./UserGameDateContext";
import { GameStats } from "./game_interface";

const initialState: GameStats = {
  tickets: 80,
  score: 0,
  level: 1,
  melonsSlashed: 0,
  error: "",
  user_id: undefined,
};

// Provider component
export const UserGameDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { webApp } = useTelegram();
  const [userGameData, setUserGameData] = useState(initialState);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchUserGameData = useCallback(async () => {
    await webApp?.CloudStorage?.getItem(
      "melon_game_data",
      (err: any, value: any) => {
        if (err) {
          console.error("Error getting item:", err);
        } else {
          console.log("Retrieved item:", value);
          const fetchedData = value ? JSON.parse(value) : initialState;
          setUserGameData({
            ...fetchedData,
          });
          setDataFetched(true);
        }
      }
    );
  }, [webApp]);

  const sendUserGameData = useCallback(
    async (gameData: GameStats) => {
      if (!dataFetched) return; // Ensures we don't overwrite before data fetch
      await webApp?.CloudStorage?.setItem(
        "melon_game_data",
        JSON.stringify(gameData),
        (err: any, success: any) => {
          if (err) {
            console.error("Error setting item:", err);
          } else if (success) {
            console.log("Item successfully stored.");
            setUserGameData(gameData); // Update local state after successful send
          }
        }
      );
    },
    [webApp, dataFetched]
  );

  useEffect(() => {
    // Fetch data only once on mount
    if (!dataFetched) {
      fetchUserGameData();
    }
  }, [fetchUserGameData, dataFetched]);

  return (
    <UserGameDataContext.Provider
      value={{
        userGameData,
        fetchUserGameData,
        sendUserGameData,
      }}
    >
      {children}
    </UserGameDataContext.Provider>
  );
};
