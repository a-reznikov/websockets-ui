import { User } from "./types";

export const users: User[] = [];

export const getUserById = (userId: string) =>
  users.find(({ id }) => id === userId);

export const isUserExists = (userName: string) =>
  users.some(({ name }) => name === userName);

export const addUser = (newUser: User) => {
  const userIndex = users.length;
  users.push(newUser);

  console.log(users);

  return { name: newUser.name, index: userIndex };
};
