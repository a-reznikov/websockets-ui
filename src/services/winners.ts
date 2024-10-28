import { db } from "../db";
import { Action } from "./types";

export const updateWinners = (userName: string) => {
  console.log(db.isWinnerExists(userName));
  if (db.isWinnerExists(userName)) {
    db.updateWinner(userName);
  } else {
    db.addWinner(userName);
  }

  return JSON.stringify({
    type: Action.UPDATE_WINNERS,
    data: JSON.stringify(db.getWinners()),
    id: 0,
  });
};
