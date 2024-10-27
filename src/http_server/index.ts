import * as fs from "fs";
import * as path from "path";
import * as http from "http";

import WebSocket, { WebSocketServer } from "ws";
import { mainHandler } from "../services/main-handler";

export const httpServer = http.createServer(function (req, res) {
  const __dirname = path.resolve(path.dirname(""));
  const file_path =
    __dirname + (req.url === "/" ? "/front/index.html" : "/front" + req.url);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

export interface WebSocketWithUuid extends WebSocket {
  uuid: string;
}

export const wss = new WebSocketServer({ port: 3000 });
console.log(`Start Websocket Server on the 3000 port!`);

wss.on("connection", (ws: WebSocketWithUuid) => {
  ws.uuid = global.crypto.randomUUID();

  ws.on("error", console.error);

  ws.on("message", (message: string) => mainHandler(ws, message));
});
