import { Action, ParsedMessage } from "./types";
import { incomingMessageLogger, outgoingMessageLogger } from "./messages";
import { WebSocketWithUuid, wss } from "../http_server";
import { addNewUser } from "./user";
import { updateWinners } from "./winners";

export const mainHandler = (ws: WebSocketWithUuid, message: string) => {
  const parsedMessage = JSON.parse(message);
  incomingMessageLogger(ws.uuid, JSON.stringify(parsedMessage));

  const { type, data }: ParsedMessage = parsedMessage;

  const parsedData = JSON.parse(data);

  if (type === Action.REGISTRATION) {
    const addedUser = addNewUser({
      id: ws.uuid,
      name: parsedData.name,
      password: parsedData.password,
    });

    outgoingMessageLogger(addedUser);
    ws.send(addedUser);

    const updatedWinners = updateWinners(parsedData.name);

    wss.clients.forEach((client) => {
      outgoingMessageLogger(updatedWinners);
      client.send(updatedWinners);
    });
  }

  return "";
};
