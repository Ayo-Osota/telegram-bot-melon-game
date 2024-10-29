import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Task from "./Tasks";
import Invites from "./Invites";
import App from "./App";
import Game from "./Game";
import { TelegramProvider } from "./context/TelegramProvider";
import GameOver from "./GameOver";
import { GameProvider } from "./context/GameProvider";
import { UserGameDataProvider } from "./context/UserGameDataProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "task",
        element: <Task />,
      },
      {
        path: "invites",
        element: <Invites />,
      },
    ],
  },
  {
    path: "game",
    element: <Game />,
  },
  {
    path: "gameover",
    element: <GameOver />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TelegramProvider>
      <GameProvider>
        <UserGameDataProvider>
          <RouterProvider router={router} />
        </UserGameDataProvider>
      </GameProvider>
    </TelegramProvider>
  </StrictMode>
);
