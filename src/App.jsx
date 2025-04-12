import { useEffect } from "react";
import { Main } from "./components/layout/Main";
import { Navbar } from "./components/layout/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setupSocket } from "./redux/slices/socketSlice";
import { listenEvent } from "./services/socketService";
import {
  setOutput,
  setIsQueued,
  setIsRunning,
  setError,
} from "./redux/slices/codeSlice";

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
);

const ErrorMessage = () => (
  <div className="text-red-500 text-2xl font-bold">
    Socket server is not running
  </div>
);

function App() {
  const dispatch = useDispatch();
  const { connected, error } = useSelector((state) => state.socket);

  useEffect(() => {
    dispatch(setupSocket());
  }, [dispatch]);

  useEffect(() => {
    if (!connected) return;

    const handleSubmission = (data) => {
      dispatch(setOutput(data?.output));
      dispatch(setError(data?.error));
      dispatch(setIsQueued(false));
      dispatch(setIsRunning(false));
    };

    const handleQueued = () => {
      dispatch(setIsQueued(true));
      dispatch(setIsRunning(false));
    };

    listenEvent("code:get-submission", handleSubmission);
    listenEvent("code:queued", handleQueued);
  }, [connected, dispatch]);

  const renderContent = () => {
    if (!connected) {
      return (
        <div className="flex items-center justify-center h-screen">
          {error ? <ErrorMessage /> : <LoadingSpinner />}
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
      {renderContent()}
    </div>
  );
}

export default App;
