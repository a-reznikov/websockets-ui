import { User, db } from "../db";
import { Action } from "./types";

export const addUserToWinners = (data: string) => {
  const user: User = JSON.parse(data);

  if (db.isWinnerExists(user.name)) {
    db.updateWinner(user.name);
  } else {
    db.addWinner(user.name);
  }

  return JSON.stringify({
    type: Action.UPDATE_WINNERS,
    data: JSON.stringify(db.getWinners()),
    id: 0,
  });
};

export const updateWinners = () => {
  return JSON.stringify({
    type: Action.UPDATE_WINNERS,
    data: JSON.stringify(db.getWinners()),
    id: 0,
  });
};
