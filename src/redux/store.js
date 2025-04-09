import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./slices/socketSlice";
import codeReducer from "./slices/codeSlice";
const store = configureStore({
  reducer: {
    socket: socketReducer,
    code: codeReducer,
  },
});

export default store;
