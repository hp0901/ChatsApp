// frontend/src/socket.js
import { io } from "socket.io-client";

// For local testing
const socket = io("http://localhost:4000", {
  transports: ["websocket"],  // force websocket
  reconnection: true,
});

export default socket;
