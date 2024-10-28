import { User, Winner } from "./types";

export const users: User[] = [];
export const winners: Winner[] = [];

export const getUserById = (userId: string) =>
  users.find(({ id }) => id === userId);

export const isUserExists = (userName: string) =>
  users.some(({ name }) => name === userName);

export const addUser = (newUser: User) => {
  const userIndex = users.length;
  users.push(newUser);

  return { name: newUser.name, index: userIndex };
};

// Winners
export const getWinners = () => winners;

export const isWinnerExists = (userName: string) =>
  winners.some(({ name }) => name === userName);

export const addWinner = (userName: string) => {
  winners.push({ name: userName, wins: 0 });

  return winners;
};

export const updateWinner = (userName: string) => {
  winners.forEach((winner, index) => {
    if (winner.name === userName) {
      winners[index] = {
        ...winner,
        wins: winner.wins + 1,
      };
    }
  });

  return winners;
};
