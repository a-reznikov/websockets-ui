import { db } from "../db";
import { Action } from "./types";

export const createGame = (idGame: string, idPlayer: string) => {
  db.createGame(idGame, idPlayer);

  return JSON.stringify({
    type: Action.CREATE_GAME,
    data: JSON.stringify({
      idGame,
      idPlayer,
    }),
    id: 0,
  });
};
