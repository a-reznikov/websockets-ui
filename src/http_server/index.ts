import * as fs from "fs";
import * as path from "path";
import * as http from "http";

import WebSocket, { WebSocketServer } from "ws";

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

export interface WebSocketWithID extends WebSocket {
  id?: number;
}

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws: WebSocketWithID) => {
  ws.id = Math.floor(Math.random() * 100) + 1;
  ws.on("error", console.error);

  console.log("WS with id", ws.id);

  ws.on("message", (data: string) => console.log("Data", data));
});
