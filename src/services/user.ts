import { User, db } from "../db";
import { Action } from "./types";

export const addNewUser = (user: User) => {
  if (db.isUserExists(user.name)) {
    return JSON.stringify({
      type: Action.REGISTRATION,
      data: JSON.stringify({
        name: user.name,
        index: 0,
        error: true,
        errorText: `User with name ${user.name} already exists.`,
      }),
      id: 0,
    });
  }

  const { name, index } = db.addUser(user);

  return JSON.stringify({
    type: Action.REGISTRATION,
    data: JSON.stringify({
      name,
      index,
      error: false,
      errorText: "",
    }),
    id: 0,
  });
};
