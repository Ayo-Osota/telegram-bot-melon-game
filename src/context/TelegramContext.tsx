import { createContext, useContext } from "react";
import { ITelegramContext } from "./TelegramProvider";

export const TelegramContext = createContext<ITelegramContext>({});

export const useTelegram = () => useContext(TelegramContext);
