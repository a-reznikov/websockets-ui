import { ShipBoard, db } from "../db";
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

export const addShipToBoard = (data: string) => {
  const board: ShipBoard = JSON.parse(data);

  db.addShipToBoard(board);

  return JSON.stringify({
    type: Action.START_GAME,
    data: JSON.stringify({
      ships: board.ships,
      currentPlayerIndex: board.indexPlayer,
    }),
    id: 0,
  });
};
