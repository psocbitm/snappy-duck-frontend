import { useEffect } from "react";
import { Main } from "./components/layout/Main";
import { Navbar } from "./components/layout/Navbar";
import { useDispatch } from "react-redux";
import { setupSocket } from "./redux/slices/socketSlice";
import useSocket from "./hooks/useSocket";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setupSocket());
  }, [dispatch]);
  const { connected, error, emitEvent, listenEvent } = useSocket();

  useEffect(() => {
    listenEvent("get-submitted-code", (data) => {
      console.log(data);
    });
  }, [listenEvent]);

  const handleRunCode = () => {
    if (connected) {
      emitEvent("submit-code", { code });
    } else {
      console.error("error", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-primary">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
