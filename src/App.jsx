import { useEffect } from "react";
import { Main } from "./components/layout/Main";
import { Navbar } from "./components/layout/Navbar";
import { useDispatch } from "react-redux";
import { setupSocket } from "./redux/slices/socketSlice";
import { useSelector } from "react-redux";
import { listenEvent } from "./services/socketService";
import { setOutput, setIsQueued, setIsRunning } from "./redux/slices/codeSlice";
function App() {
  const dispatch = useDispatch();
  const { connected } = useSelector((state) => state.socket);
  useEffect(() => {
    dispatch(setupSocket());
  }, [dispatch]);

  useEffect(() => {
    if (connected) {
      listenEvent("code:get-submission", (data) => {
        dispatch(setOutput(data));
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
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
