const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const connectDB = require("./config/db");
const postRoutes = require("./routes/post");
const { setupWebSocket, broadcast } = require("./ws/webSocket");

// Initialize app and connect to DB
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/posts", postRoutes);

// Start HTTP server
const PORT = 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Setup WebSocket server
setupWebSocket(server);

// Watch for post creation and deletion to notify WebSocket clients
const Post = require("./models/Post");
Post.watch().on("change", (change) => {
  if (change.operationType === "insert") {
    broadcast(change.fullDocument);
  } else if (change.operationType === "delete") {
    broadcast({ id: change.documentKey._id, deleted: true });
  }
});
