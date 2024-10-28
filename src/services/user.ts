import { User, db } from "../db";
import { Action } from "./types";

export const signUpUser = (
  data: string,
  setUserName: (userName: string) => void
) => {
  const user: User = JSON.parse(data);

  const foundedUser = db.getUserByName(user.name);

  if (foundedUser) {
    if (foundedUser.password === user.password) {
      setUserName(foundedUser.name);

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
        index: null,
        error: true,
        errorText: `Wrong password!`,
      }),
      id: 0,
    });
  }

  const createdUser = db.addUser(user);
  setUserName(createdUser.name);

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
