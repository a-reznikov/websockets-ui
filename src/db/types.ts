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
