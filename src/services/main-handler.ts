import { WebSocket } from "ws";
import { Action, ParsedMessage } from "./types";
import { incomingMessageLogger, messageSender } from "./messages";
import { wss } from "../http_server";
import { signUpUser } from "./user";
import { addUserToWinners, updateWinners } from "./winners";
import { createRoom, getAvailableRooms } from "./room";

export const mainHandler = (userId: string, ws: WebSocket, message: string) => {
  const parsedMessage = JSON.parse(message);
  incomingMessageLogger(userId, JSON.stringify(parsedMessage));

  const { type, data }: ParsedMessage = parsedMessage;

  if (type === Action.REGISTRATION) {
    const signedUpUser = signUpUser(data);

    messageSender(ws, signedUpUser);

    const addedToWinners = addUserToWinners(data);
    const availableRooms = getAvailableRooms();

    wss.clients.forEach((client) => {
      messageSender(client, addedToWinners);
      messageSender(client, availableRooms);
    });
  }

  if (type === Action.CREATE_ROOM) {
    const room = createRoom(userId);

    // const userToRoom = JSON.stringify({
    //   type: Action.ADD_USER_TO_ROOM,
    //   data: JSON.stringify({
    //     indexRoom: room.roomId,
    //   }),
    //   id: 0,
    // });

    // messageSender(ws, userToRoom);
    // ws.send(userToRoom);

    const availableRooms = getAvailableRooms();

    wss.clients.forEach((client) => {
      messageSender(client, availableRooms);
    });
  }

  return "";
};
