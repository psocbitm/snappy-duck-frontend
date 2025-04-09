import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: "",
  language: "javascript",
  input: "",
  output: "",
  error: "",
  isRunning: false,
  isQueued: false,
};

const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setOutput: (state, action) => {
      state.output = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsRunning: (state, action) => {
      state.isRunning = action.payload;
    },
    resetState: (state) => {
      state.code = "";
      state.language = "javascript";
      state.input = "";
      state.output = "";
      state.error = "";
    },
    resetCode: (state) => {
      state.code = "";
    },
    resetInput: (state) => {
      state.input = "";
    },
    resetOutput: (state) => {
      state.output = "";
    },
    resetError: (state) => {
      state.error = "";
    },
    resetIsRunning: (state) => {
      state.isRunning = false;
    },
    setIsQueued: (state, action) => {
      state.isQueued = action.payload;
    },
    resetIsQueued: (state) => {
      state.isQueued = false;
    },
  },
});

export const {
  setCode,
  setLanguage,
  setInput,
  setOutput,
  setError,
  setIsRunning,
  resetState,
  resetCode,
  resetInput,
  resetOutput,
  resetError,
  resetIsRunning,
  setIsQueued,
  resetIsQueued,
} = codeSlice.actions;
export default codeSlice.reducer;
