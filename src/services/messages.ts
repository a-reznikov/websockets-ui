export const incomingMessageLogger = (uuid: string, message: string) => {
  console.log(`Incoming from ${uuid}:`, message);
};

export const outgoingMessageLogger = (message: string) => {
  console.log("Outgoing:", message);
};
