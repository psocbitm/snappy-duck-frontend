import { useEffect } from "react";
import { Main } from "./components/layout/Main";
import { Navbar } from "./components/layout/Navbar";
import { useDispatch } from "react-redux";
import { setupSocket } from "./redux/slices/socketSlice";
import { useSelector } from "react-redux";
import { listenEvent } from "./services/socketService";
import {
  setOutput,
  setIsQueued,
  setIsRunning,
  setError,
} from "./redux/slices/codeSlice";
function App() {
  const dispatch = useDispatch();
  const { connected, error } = useSelector((state) => state.socket);
  useEffect(() => {
    dispatch(setupSocket());
  }, [dispatch]);

  useEffect(() => {
    if (connected) {
      listenEvent("code:get-submission", (data) => {
        dispatch(setOutput(data?.output));
        dispatch(setError(data?.error));
        dispatch(setIsQueued(false));
        dispatch(setIsRunning(false));
      });
      listenEvent("code:queued", () => {
        dispatch(setIsQueued(true));
        dispatch(setIsRunning(false));
      });
    }
  }, [connected, dispatch]);

  return (
    <div className="flex min-h-screen max-h-screen w-full flex-col bg-primary">
      {error ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-red-500 text-2xl font-bold">
            Socket server is not running
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <Main />
        </>
      )}
    </div>
  );
}

export default App;
