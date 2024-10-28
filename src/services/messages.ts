import { WebSocketWithUser } from "../http_server";

export const incomingMessageLogger = (userId: string, message: string) => {
  console.log(`Incoming from User ${userId}:`, message);
};

export const outgoingMessageLogger = (message: string) => {
  console.log("Outgoing:", message);
};

export const messageSender = (ws: WebSocketWithUser, message: string) => {
  ws.send(message);

  outgoingMessageLogger(message);
};
