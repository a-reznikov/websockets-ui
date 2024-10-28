import { Game, Room, RoomUser, User, UserWithIndex, Winner } from "./types";

export const users: UserWithIndex[] = [];
export const winners: Winner[] = [];
export const rooms: Room[] = [];
export const games: Game[] = [];

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
export const getRoomById = (indexRoom: string) =>
  rooms.find(({ roomId }) => roomId === indexRoom);

export const getAvailableRooms = () =>
  rooms.filter(({ roomUsers }) => roomUsers.length === 1);

export const createRoom = (currentUserName: string) => {
  const roomId = global.crypto.randomUUID();
  const room: Room = { roomId, roomUsers: [] };

  const roomOwner = getUserByName(currentUserName);

  if (roomOwner) {
    room.roomUsers.push({ name: roomOwner.name, index: roomOwner.index });
  }

  rooms.push(room);

  return room;
};

export const isUserInRoom = (roomUsers: RoomUser[], userName: string) =>
  roomUsers.some(({ name }) => name === userName);

export const addUserToRoom = (indexRoom: string, currentUserName: string) => {
  const joinedUser = getUserByName(currentUserName);

  if (joinedUser) {
    rooms.forEach((room, index) => {
      if (room.roomId === indexRoom) {
        if (!isUserInRoom(room.roomUsers, currentUserName)) {
          rooms[index] = {
            ...room,
            roomUsers: [
              ...room.roomUsers,
              { name: joinedUser.name, index: joinedUser.index },
            ],
          };
        }
      }
    });
  }

  const updatedRoom = getRoomById(indexRoom);

  return updatedRoom;
};

// Game
export const createGame = (idGame: string, idPlayer: string) => {
  const game: Game = { idGame, idPlayer };

  games.push(game);

  return game;
};
