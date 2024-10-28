import { WebSocket } from "ws";

export const incomingMessageLogger = (userId: string, message: string) => {
  console.log(`Incoming from User ${userId}:`, message);
};

export const outgoingMessageLogger = (message: string) => {
  console.log("Outgoing:", message);
};

export const messageSender = (ws: WebSocket, message: string) => {
  ws.send(message);

  outgoingMessageLogger(message);
};
