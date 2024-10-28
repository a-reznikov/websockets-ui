import { User, UserWithIndex, db } from "../db";
import { Action } from "./types";

export const signUpUser = (data: string) => {
  const user: User = JSON.parse(data);

  const foundedUser = db.getUserByName(user.name);

  if (foundedUser) {
    if (foundedUser.password === user.password) {
      return JSON.stringify({
        type: Action.REGISTRATION,
        data: JSON.stringify({
          name: foundedUser.name,
          index: foundedUser.index,
          error: false,
          errorText: "",
        }),
        id: 0,
      });
    }

    return JSON.stringify({
      type: Action.REGISTRATION,
      data: JSON.stringify({
        name: user.name,
        index: 0,
        error: true,
        errorText: `Wrong password!`,
      }),
      id: 0,
    });
  }

  const createdUser = db.addUser(user);

  return JSON.stringify({
    type: Action.REGISTRATION,
    data: JSON.stringify({
      name: createdUser.name,
      index: createdUser.index,
      error: false,
      errorText: "",
    }),
    id: 0,
  });
};
