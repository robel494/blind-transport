const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });
let busSocket = null;
let userSocket = null;

wss.on("connection", ws => {
  ws.on("message", msg => {
    const data = JSON.parse(msg);

    if (data.type === "BUS_CONNECT") busSocket = ws;
    if (data.type === "USER_CONNECT") userSocket = ws;

    if (busSocket && userSocket) {
      if (data.type !== "BUS_CONNECT" && data.type !== "USER_CONNECT") {
        if (ws === busSocket) userSocket.send(JSON.stringify(data));
        if (ws === userSocket) busSocket.send(JSON.stringify(data));
      }
    }
  });
});

console.log("Server running");



