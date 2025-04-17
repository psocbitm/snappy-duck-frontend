// services/socketService.js
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

let socket = null;
let reconnectAttempts = 0;
const MAX_RETRIES = 5;
const BASE_DELAY = 1000;

const connectSocket = (
  dispatch,
  { onConnected, onDisconnected, onError, onMaxRetries }
) => {
  if (!socket) {
    socket = io(SOCKET_SERVER_URL, {
      autoConnect: false,
    });

    socket.on("connect", () => {
      reconnectAttempts = 0;
      onConnected(socket.id);
    });

    socket.on("disconnect", () => {
      onDisconnected();
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
      if (reconnectAttempts < MAX_RETRIES) {
        reconnectAttempts++;
        dispatch({
          type: "socket/setReconnecting",
          payload: reconnectAttempts,
        });
        const delay = BASE_DELAY * 2 ** (reconnectAttempts - 1);
        setTimeout(() => socket.connect(), delay);
      } else {
        onMaxRetries();
        onError(err.message || "Failed to connect");
      }
    });

    socket.connect();
  }

  return socket;
};

const emitEvent = (event, data) => {
  if (socket?.connected) {
    socket.emit(event, data);
  }
};

const listenEvent = (event, callback) => {
  socket?.on(event, callback);
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    reconnectAttempts = 0;
  }
};

export { connectSocket, emitEvent, listenEvent, disconnectSocket };
