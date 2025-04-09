import { useSelector } from "react-redux";

export const OutputContainer = () => {
  const { output } = useSelector((state) => state.code);

  return (
    <div className="w-full h-full bg-primary p-2 md:pl-1 md:pt-1 overflow-hidden">
      <div className="w-full h-full bg-[#1e1e1e] rounded-md flex flex-col">
        <div className="text-gray-300 text-lg font-semibold p-2">Output</div>
        <div className="w-full border-t border-gray-700" />
        <div className="flex-1 p-3 overflow-hidden">
          <textarea
            className="w-full h-full bg-transparent focus:outline-none focus:ring-0 placeholder:text-gray-400 
            font-mono text-white resize-none overflow-y-auto"
            placeholder="Output will appear here"
            readOnly
            value={output}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};
