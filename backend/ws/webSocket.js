const { WebSocketServer } = require("ws");

let clients = [];

const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });
  console.log("WebSocket server started on port 5000");

  wss.on("connection", (ws) => {
    clients.push(ws);
    ws.on("close", () => {
      clients = clients.filter((client) => client !== ws);
    });
  });
};

// Broadcast function
const broadcast = (message) => {
  clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

module.exports = { setupWebSocket, broadcast };
