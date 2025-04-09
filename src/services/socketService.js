import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

let socket = null;

// Connects to the Socket.IO server
const connectSocket = () => {
  if (!socket) {
    socket = io(SOCKET_SERVER_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socket.on("connect", () => {
      console.log("Connected to socket with id:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
  }

  return socket;
};

// Emits events to the server
const emitEvent = (event, data) => {
  if (socket && socket.connected) {
    socket.emit(event, data);
  } else {
    console.error("Socket is not connected.");
  }
};

// Listens for specific events from the server
const listenEvent = (event, callback) => {
  if (socket) {
    socket.on(event, callback);
  }
};

// Disconnect the socket
const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export { connectSocket, emitEvent, listenEvent, disconnectSocket };
