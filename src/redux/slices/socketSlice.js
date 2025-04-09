import { createSlice } from "@reduxjs/toolkit";
import {
  connectSocket,
  emitEvent,
  listenEvent,
  disconnectSocket,
} from "../../services/socketService";

// Initial state for Redux
const initialState = {
  connected: false,
  socketId: null,
  error: null, // Store only serializable error data
};

// Redux slice for managing socket state
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnectionStatus(state, action) {
      state.connected = action.payload.connected;
      state.socketId = action.payload.socketId;
    },
    setError(state, action) {
      // Save only the error message or type, not the entire error object
      state.error = action.payload.message || "Unknown error";
    },
  },
});

// Thunks for managing socket connection state
export const setupSocket = () => (dispatch) => {
  const socketInstance = connectSocket();

  socketInstance.on("connect", () => {
    dispatch(
      setConnectionStatus({ connected: true, socketId: socketInstance.id })
    );
  });

  socketInstance.on("disconnect", () => {
    dispatch(setConnectionStatus({ connected: false, socketId: null }));
  });

  socketInstance.on("connect_error", (err) => {
    // Handle error: dispatch only the message part of the error
    dispatch(setError({ message: err.message || "Socket connection failed" }));
    dispatch(setConnectionStatus({ connected: false, socketId: null }));
  });
};

// Action to emit events
export const socketEmitEvent = (event, data) => (dispatch, getState) => {
  const { connected } = getState().socket;
  if (connected) {
    emitEvent(event, data);
  } else {
    console.error("Socket is not connected");
  }
};

// Action to listen for events
export const socketListenEvent = (event, callback) => (dispatch, getState) => {
  const { connected } = getState().socket;
  if (connected) {
    listenEvent(event, callback);
  }
};

// Action to disconnect the socket
export const disconnectSocketAction = () => (dispatch) => {
  disconnectSocket();
  dispatch(setConnectionStatus({ connected: false, socketId: null }));
  dispatch(setError({ message: "Disconnected" }));
};

// Exporting actions
export const { setConnectionStatus, setError } = socketSlice.actions;
export default socketSlice.reducer;
