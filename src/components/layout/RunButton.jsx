import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { emitEvent } from "../../services/socketService";
import { useDispatch } from "react-redux";
import { setIsRunning } from "../../redux/slices/codeSlice";
export const RunButton = () => {
  const dispatch = useDispatch();
  const { code, language, input, isRunning, isQueued } = useSelector(
    (state) => state.code
  );
  const handleRunCode = () => {
    emitEvent("code:submit", { code, language, input });
    dispatch(setIsRunning(true));
  };
  return (
    <Button
      variant="outline"
      className="bg-transparent text-white border-gray-400"
      onClick={handleRunCode}
      disabled={isRunning || isQueued}
    >
      {isRunning ? "Starting..." : isQueued ? "Queued..." : "Run"}
    </Button>
  );
};
