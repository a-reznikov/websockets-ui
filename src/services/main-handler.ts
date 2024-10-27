import WebSocket from "ws";
import { Action, ParsedMessage } from "./types";
import {
  incomingMessageHandler,
  outgoingMessageHandler,
} from "./message-handler";

export const mainHandler = (ws: WebSocket, message: string) => {
  const parsedMessage = JSON.parse(message);
  incomingMessageHandler(JSON.stringify(parsedMessage));
  const { type, data }: ParsedMessage = parsedMessage;

  const parsedData = JSON.parse(data);

  if (type === Action.REGISTRATION) {
    const response = JSON.stringify({
      type: Action.REGISTRATION,
      data: JSON.stringify({
        name: parsedData.name,
        index: 0,
        error: false,
        errorText: "",
      }),
      id: 0,
    });

    outgoingMessageHandler(response);

    ws.send(response);
  }

  return "";
};
