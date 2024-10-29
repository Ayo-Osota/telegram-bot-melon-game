import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import melonImg from "./assets/melon.png";
import stoneImg from "./assets/stone.png";
import crownedMelonImg from "./assets/crownedMelonImg.png";
import hitStone from "./assets/hit-stone.png";
import slashedMelon from "./assets/slashed-melon.png";
import greenBlob from "./assets/greeen-blob.png";
import { Link, useNavigate } from "react-router-dom";
import { useGame } from "./context/GameContext";
import { useUserGameData } from "./context/UserGameDateContext";
import { GameStats } from "./context/game_interface";

type Spawned = {
  id: number;
  top: number;
  left: number;
  slashed: boolean;
  type: "MELON" | "CROWNED" | "STONE";
  score: number;
};

function Game() {
  const {
    timeLeft,
    score,
    decreaseTimer,
    slashMelon,
    status,
    gameOver,
    melonsSlashed,
  } = useGame();
  const { sendUserGameData, userGameData } = useUserGameData();

  const [spawned, setSpawned] = useState<Spawned[]>([]);
  const [level, setLevel] = useState<number>(userGameData.level);

  const navigate = useNavigate();

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        decreaseTimer();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [decreaseTimer, timeLeft]);

  // Spawn items (melon or stone) at intervals
  useEffect(() => {
    if (timeLeft > 0) {
      const spawnInterval = setInterval(() => {
        const itemWidthPercentage = 20;
        const leftPosition = Math.random() * (100 - itemWidthPercentage);
        const id = Math.random();

        if (id < 0.5) {
          // 50% chance for melon,
          setSpawned((prev) => [
            ...prev,
            {
              id,
              top: 0,
              left: leftPosition,
              slashed: false,
              type: "MELON",
              score: 10,
            },
          ]);
        } else if (id < 0.75) {
          // 25% chance for Crowned melon,
          setSpawned((prev) => [
            ...prev,
            {
              id,
              top: 0,
              left: leftPosition,
              slashed: false,
              type: "CROWNED",
              score: 100,
            },
          ]);
        } else {
          // 25% for stone
          setSpawned((prev) => [
            ...prev,
            {
              id,
              top: 0,
              left: leftPosition,
              slashed: false,
              type: "STONE",
              score: -10,
            },
          ]);
        }
      }, 1000); // Adjust interval time if needed

      return () => clearInterval(spawnInterval);
    }
  }, [timeLeft]);

  // Update score and level
  const handleHit = (spawned: Spawned) => {
    if (spawned.slashed) return;
    slashMelon(spawned.score);
    if (spawned.type !== "STONE") {
      setLevel((prev) => prev + 0.1);
    }
    setSpawned((prev) =>
      prev.map((slashed) =>
        slashed.id === spawned.id ? { ...slashed, slashed: true } : slashed
      )
    );
  };

  // Move melons down
  useEffect(() => {
    const moveMelons = setInterval(() => {
      setSpawned(
        (prev) =>
          prev
            .map((melon) => ({ ...melon, top: melon.top + 5 }))
            .filter((melon) => melon.top < 100) // remove melons that reach the bottom
      );
    }, 200);
    return () => clearInterval(moveMelons);
  }, []);

  useEffect(() => {
    if (status !== "playing" || userGameData.tickets == 0) {
      navigate("/");
    }
  }, [status, navigate, userGameData]);

  useEffect(() => {
    if (timeLeft === 0 && status == "playing") {
      gameOver();
      const updateUserGameData = (gameData: GameStats) => {
        return {
          score: userGameData.score + gameData.score,
          level: gameData.level,
          melonsSlashed: userGameData.melonsSlashed + gameData.melonsSlashed,
          tickets: userGameData.tickets + gameData.tickets,
          error: "Updated",
        };
      };
      const updatedGameData = updateUserGameData({
        score,
        level,
        melonsSlashed,
        tickets: -1,
      });

      sendUserGameData(updatedGameData);

      navigate("/gameover");
    }
  }, [
    navigate,
    timeLeft,
    gameOver,
    score,
    level,
    melonsSlashed,
    userGameData,
    sendUserGameData,
    status,
  ]);

  return (
    <div className="grid grid-rows-[40px,auto,74px] h-full">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Icon icon="fa6-solid:arrow-left" />
          </Link>
          <p className="text-white/70 text-base leading-none font-bold">
            00:{String(timeLeft).padStart(2, "0")}
          </p>
        </div>

        <p className="text-gradient font-bold leading-none text-[2rem]">
          {score}
        </p>
      </header>

      <main className="relative overflow-hidden">
        {spawned.map((spawned) => (
          <div
            key={spawned.id}
            className="absolute w-1/5 transition-opacity duration-300 delay-100"
            style={{
              top: `${spawned.top}%`,
              left: `${spawned.left}%`,
              cursor: "pointer", // Slight scale-up on slashed
              opacity: spawned.slashed ? 0 : 1, // Fade effect on slashed
            }}
            onClick={() => handleHit(spawned)}
          >
            {spawned.type === "MELON" ? (
              spawned.slashed ? (
                <img
                  className="w-full"
                  src={slashedMelon}
                  alt="slashed melon"
                />
              ) : (
                <img className="w-full" src={melonImg} alt="melon" />
              )
            ) : spawned.type === "STONE" ? (
              spawned.slashed ? (
                <img className="w-full" src={hitStone} alt="hit stone" />
              ) : (
                <img className="w-full" src={stoneImg} alt="stone" />
              )
            ) : (
              <div className="w-full grid grid-cols-1 grid-rows-1 items-center">
                <img
                  src={greenBlob}
                  alt="Blob"
                  className={`w-full col-start-1 row-start-1 transition-opacity duration-300 delay-100 ${spawned.slashed ? "scale-100" : "scale-0"}`}
                />
                {spawned.slashed ? (
                  <img
                    className="w-full col-start-1 row-start-1"
                    src={slashedMelon}
                    alt="slashed crownd melon"
                  />
                ) : (
                  <img
                    className="w-full col-start-1 row-start-1"
                    src={crownedMelonImg}
                    alt="crowned melon"
                  />
                )}{" "}
              </div>
            )}
          </div>
        ))}
      </main>

      <footer className="py-3">
        {/* {JSON.stringify(userGameData, null, 2)} */}
        <p className="font-bold text-xs leading-none text-white">
          Level {Math.floor(level)}
        </p>
        <div className="w-full bg-gray rounded-2xl h-8 mt-2 overflow-hidden">
          <div
            className="h-full bg-gradient"
            style={{ width: `${(level % 1) * 100}%` }}
          ></div>
        </div>
      </footer>
    </div>
  );
}

export default Game;
