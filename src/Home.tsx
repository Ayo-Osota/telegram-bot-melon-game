import { useNavigate } from "react-router-dom";
import melon from "./assets/melon.png";
import { useGame } from "./context/GameContext";
import { useUserGameData } from "./context/UserGameDateContext";

function Home() {
  const { gameStart } = useGame();
  const { userGameData } = useUserGameData();
  const navigate = useNavigate();

  const startGame = () => {
    gameStart();

    navigate("/game");
  };

  return (
    <main className="relative">
      <p className="text-base font-medium leading-snug text-white/60 uppercase mt-10 absolute right-0">
        level
        <span className="text-2xl leading-6 font-bold">
          {Math.floor(userGameData.level)}
        </span>
      </p>
      <div className="flex items-center justify-center h-full w-full flex-col my-1">
        <img src={melon} alt="Giant melon" />
        {/* {JSON.stringify(userGameData, null, 2)} */}
        <p className="mt-4">
          <span className="text-gradient text-[2.5rem] leading-6 font-bold">
            {userGameData.melonsSlashed}
          </span>
          <span className="text-base leading-none capitalize">melon</span>
        </p>

        <button
          type="button"
          className="bg-green hover:bg-green/80 py-4 w-full inline-flex text-center justify-center rounded-2xl mt-[min(90px,10.56vh)] font-bold text-base leading-snug"
          onClick={startGame}
        >
          Smash a melon
        </button>
      </div>
    </main>
  );
}

export default Home;
