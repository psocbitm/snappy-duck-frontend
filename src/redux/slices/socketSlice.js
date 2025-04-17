// redux/slices/socketSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  connectSocket,
  emitEvent,
  listenEvent,
  disconnectSocket,
} from "../../services/socketService";

const initialState = {
  connected: false,
  socketId: null,
  error: null,
  reconnecting: false,
  attempt: 0,
  maxRetriesReached: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnectionStatus(state, action) {
      state.connected = action.payload.connected;
      state.socketId = action.payload.socketId;
      state.reconnecting = false;
      state.attempt = 0;
      state.error = null;
      state.maxRetriesReached = false;
    },
    setError(state, action) {
      state.error = action.payload || "Unknown error";
    },
    setReconnecting(state, action) {
      state.reconnecting = true;
      state.attempt = action.payload;
    },
    setMaxRetriesReached(state) {
      state.reconnecting = false;
      state.maxRetriesReached = true;
    },
    resetSocketState(state) {
      Object.assign(state, initialState);
    },
  },
});

export const setupSocket = () => (dispatch) => {
  connectSocket(dispatch, {
    onConnected: (socketId) => {
      dispatch(
        socketSlice.actions.setConnectionStatus({ connected: true, socketId })
      );
    },
    onDisconnected: () => {
      dispatch(socketSlice.actions.resetSocketState());
    },
    onError: (message) => {
      dispatch(socketSlice.actions.setError(message));
    },
    onMaxRetries: () => {
      dispatch(socketSlice.actions.setMaxRetriesReached());
    },
  });
};

export const socketEmitEvent = (event, data) => (dispatch, getState) => {
  const { connected } = getState().socket;
  if (connected) emitEvent(event, data);
};

export const socketListenEvent = (event, callback) => () => {
  listenEvent(event, callback);
};

export const disconnectSocketAction = () => (dispatch) => {
  disconnectSocket();
  dispatch(socketSlice.actions.resetSocketState());
};

export const {
  setConnectionStatus,
  setError,
  setReconnecting,
  setMaxRetriesReached,
  resetSocketState,
} = socketSlice.actions;

export default socketSlice.reducer;
