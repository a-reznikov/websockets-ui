import { db } from "../db";
import { Action } from "./types";

export const createRoom = (currentUserName: string) => {
  const room = db.createRoom(currentUserName);

  return room;
};

export const getAvailableRooms = () => {
  const availableRooms = db.getAvailableRooms();

  return JSON.stringify({
    type: Action.UPDATE_ROOM,
    data: JSON.stringify(availableRooms),
    id: 0,
  });
};

export const addUserToRoom = (data: string, currentUserName: string) => {
  const { indexRoom }: { indexRoom: string } = JSON.parse(data);

  const updatedRoom = db.addUserToRoom(indexRoom, currentUserName);

  return updatedRoom;
};
