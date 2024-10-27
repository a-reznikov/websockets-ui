import { Action, ParsedMessage } from "./types";
import { incomingMessageLogger, outgoingMessageLogger } from "./message-logger";
import { WebSocketWithUuid } from "../http_server";
import { addNewUser } from "./user";

export const mainHandler = (ws: WebSocketWithUuid, message: string) => {
  const parsedMessage = JSON.parse(message);
  incomingMessageLogger(ws.uuid, JSON.stringify(parsedMessage));

  const { type, data }: ParsedMessage = parsedMessage;

  const parsedData = JSON.parse(data);

  if (type === Action.REGISTRATION) {
    const response = addNewUser({
      id: ws.uuid,
      name: parsedData.name,
      password: parsedData.password,
    });

    outgoingMessageLogger(response);
    ws.send(response);
  }

  return "";
};
