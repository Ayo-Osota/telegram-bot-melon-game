import { Link, useNavigate } from "react-router-dom";
import melon from "./assets/melon.png";
import { useEffect } from "react";
import { useGame } from "./context/GameContext";

function GameOver() {
  const { melonsSlashed, status, resetGame } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (status !== "over") {
      navigate("/");
    }
  }, [status, navigate]);

  return (
    <main className="relative text-center flex flex-col items-center justify-center h-full">
      <h1 className="font-bold text-2xl leading-none">
        Game Over
        {/* {JSON.stringify(userGameData, null, 2)} */}
      </h1>
      <p className="font-medium text-white/70 text-xs leading-none mt-2">
        Melon earned
      </p>
      <img src={melon} alt="Giant melon" className="w-[71px] mt-4" />
      <p className="mt-4">
        <span className="text-gradient text-[2rem] leading-5 font-bold">
          {melonsSlashed}{" "}
        </span>
        <span className="text-xs leading-none capitalize">melon</span>
      </p>

      <Link
        className="bg-green hover:bg-green/80 py-2.5 w-full inline-flex text-center justify-center rounded-2xl mt-[min(90px,10.56vh)] font-bold text-base leading-snug"
        to="/"
        onClick={resetGame}
      >
        Back home
      </Link>
    </main>
  );
}

export default GameOver;
