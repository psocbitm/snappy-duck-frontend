import { useSelector } from "react-redux";
import { Spinner } from "./Spinner";

export const OutputContainer = () => {
  const { output, error, isRunning, isQueued } = useSelector(
    (state) => state.code
  );

  const displayText = error || output; // Simplified logic for displayText
  const textColor = error ? "text-red-400" : "text-green-400";

  return (
    <div className="w-full h-full bg-primary p-2 md:pl-1 md:pt-1 overflow-hidden">
      <div className="w-full h-full bg-[#1e1e1e] rounded-md flex flex-col">
        <div className="flex items-center justify-between p-2">
          <div className="text-gray-300 text-lg font-semibold">Output</div>
          {(isRunning || isQueued) && <Spinner size={6} />}
        </div>
        <div className="w-full border-t border-gray-700" />
        <div className="flex-1 p-3 overflow-hidden">
          <textarea
            className={`w-full h-full bg-transparent focus:outline-none focus:ring-0 
              font-mono resize-none overflow-y-auto placeholder:text-gray-400 ${textColor}`}
            placeholder="Output will appear here..."
            readOnly
            value={isQueued || isRunning ? "" : displayText || ""}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};
