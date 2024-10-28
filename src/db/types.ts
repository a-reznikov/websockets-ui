export type User = {
  name: string;
  password: string;
};

export type UserWithIndex = User & {
  index: number;
};

export type Winner = {
  name: string;
  wins: number;
};

export type RoomUser = {
  name: string;
  index: number;
};

export type Room = {
  roomId: string;
  roomUsers: RoomUser[];
};

export type Game = {
  idGame: string;
  idPlayer: string;
};

type Position = {
  x: number;
  y: number;
};

enum ShipType {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  HUGE = "huge",
}

export type Ship = {
  position: Position;
  direction: boolean;
  length: number;
  type: ShipType;
};

export type ShipBoard = {
  gameId: string;
  indexPlayer: string;
  ships: Ship[];
};
