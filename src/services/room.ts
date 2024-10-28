import { db } from "../db";
import { Action } from "./types";

export const createRoom = (currentUserName: string) => {
  const room = db.createRoom(currentUserName);

  return room;
};

export const getAvailableRooms = () => {
  const availableRooms = db.getAvailableRooms();

  console.log(availableRooms);

  return JSON.stringify({
    type: Action.UPDATE_ROOM,
    data: JSON.stringify(availableRooms),
    id: 0,
  });
};

// export const updateRoom = (roomId: string) => {
//   const room = db.createRoom(uuid);

//   return room;
// };
