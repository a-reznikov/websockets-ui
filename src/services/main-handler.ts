import { WebSocket } from "ws";
import { Action, ParsedMessage } from "./types";
import { incomingMessageLogger, messageSender } from "./messages";
import { wss } from "../http_server";
import { signUpUser } from "./user";
import { addUserToWinners, updateWinners } from "./winners";
import { addUserToRoom, createRoom, getAvailableRooms } from "./room";

type Props = {
  ws: WebSocket;
  message: string;
  currentUserName: string;
  setUserName: (userName: string) => void;
};

export const mainHandler = ({
  ws,
  message,
  currentUserName,
  setUserName,
}: Props) => {
  const parsedMessage = JSON.parse(message);
  incomingMessageLogger(currentUserName, JSON.stringify(parsedMessage));

  const { type, data }: ParsedMessage = parsedMessage;

  if (type === Action.REGISTRATION) {
    const signedUpUser = signUpUser(data, setUserName);
    messageSender(ws, signedUpUser);

    const addedToWinners = addUserToWinners(data);
    const availableRooms = getAvailableRooms();
    wss.clients.forEach((client) => {
      messageSender(client, availableRooms);
      messageSender(client, addedToWinners);
    });
  }

  if (type === Action.CREATE_ROOM) {
    createRoom(currentUserName);

    const availableRooms = getAvailableRooms();
    wss.clients.forEach((client) => {
      messageSender(client, availableRooms);
    });
  }

  if (type === Action.ADD_USER_TO_ROOM) {
    addUserToRoom(data, currentUserName);

    const availableRooms = getAvailableRooms();
    wss.clients.forEach((client) => {
      messageSender(client, availableRooms);
    });
  }

  return;
};
