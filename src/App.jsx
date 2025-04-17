import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setupSocket } from "./redux/slices/socketSlice";
import {
  setOutput,
  setIsQueued,
  setIsRunning,
  setError as setCodeError,
} from "./redux/slices/codeSlice";
import { listenEvent } from "./services/socketService";

import { Navbar } from "./components/layout/Navbar";
import { Main } from "./components/layout/Main";

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
);

const ErrorMessage = ({ message }) => (
  <div className="text-red-500 text-center text-xl font-bold">{message}</div>
);

const RetryButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mt-4 px-6 py-2 rounded bg-white text-primary font-semibold hover:bg-gray-200 transition"
  >
    Retry Connection
  </button>
);

function App() {
  const dispatch = useDispatch();
  const { connected, reconnecting, attempt, error, maxRetriesReached } =
    useSelector((state) => state.socket);

  useEffect(() => {
    dispatch(setupSocket());
  }, [dispatch]);

  useEffect(() => {
    if (!connected) return;

    listenEvent("code:get-submission", (data) => {
      dispatch(setOutput(data?.output));
      dispatch(setCodeError(data?.error));
      dispatch(setIsQueued(false));
      dispatch(setIsRunning(false));
    });

    listenEvent("code:queued", () => {
      dispatch(setIsQueued(true));
      dispatch(setIsRunning(false));
    });
  }, [connected, dispatch]);

  const handleRetry = () => {
    dispatch(setupSocket());
  };

  const renderStatus = () => {
    if (!connected) {
      return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
          {maxRetriesReached ? (
            <>
              <ErrorMessage message={error || "Failed to connect"} />
              <RetryButton onClick={handleRetry} />
            </>
          ) : reconnecting ? (
            <>
              <LoadingSpinner />
              <p className="text-white text-lg">
                Reconnecting... attempt {attempt}
              </p>
            </>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      );
    }

    return (
      <>
        <Navbar />
        <Main />
      </>
    );
  };

  return (
    <div className="flex min-h-screen max-h-screen w-full flex-col bg-primary">
      {renderStatus()}
    </div>
  );
}

export default App;
