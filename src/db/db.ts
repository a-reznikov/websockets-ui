import { Room, User, UserWithIndex, Winner } from "./types";

export const users: UserWithIndex[] = [];
export const winners: Winner[] = [];
export const rooms: Room[] = [];

export const isUserExists = (userName: string) =>
  users.some(({ name }) => name === userName);

export const getUserByName = (userName: string) =>
  users.find(({ name }) => name === userName);

export const addUser = (newUser: User) => {
  const createdUser: UserWithIndex = { ...newUser, index: users.length };

  users.push(createdUser);

  return createdUser;
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

// Room
export const getRoomById = (id: string) =>
  rooms.find(({ roomId }) => roomId === id);

export const getAvailableRooms = () =>
  rooms.map(({ roomUsers }) => roomUsers.length === 1);

export const createRoom = (userId: string) => {
  const roomId = global.crypto.randomUUID();

  const room: Room = { roomId, roomUsers: [] };

  rooms.push(room);

  return room;
};
