const WEBSOCKET_URL = "ws://localhost:5000";

export const connectToWebSocket = (onNewPost) => {
  const ws = new WebSocket(WEBSOCKET_URL);

  ws.onmessage = (event) => {
    const newPost = JSON.parse(event.data);
    onNewPost(newPost);
  };

  ws.onopen = () => console.log("Connected to WebSocket");
  ws.onclose = () => console.log("WebSocket connection closed");
};
