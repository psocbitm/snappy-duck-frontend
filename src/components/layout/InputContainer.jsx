import { useDispatch, useSelector } from "react-redux";
import { setInput } from "../../redux/slices/codeSlice";

export const InputContainer = () => {
  const dispatch = useDispatch();
  const { input } = useSelector((state) => state.code);

  const handleInputChange = (e) => {
    dispatch(setInput(e.target.value));
  };

  return (
    <div className="w-full h-full bg-primary p-2 md:pl-1 md:pb-1 overflow-hidden">
      <div className="w-full h-full bg-[#1e1e1e] rounded-md flex flex-col">
        <div className="text-gray-300 text-lg font-semibold p-2">Input</div>
        <div className="w-full border-t border-gray-700" />
        <div className="flex-1 p-3 overflow-hidden">
          <textarea
            className="w-full h-full bg-transparent focus:outline-none focus:ring-0 placeholder:text-gray-400 
            font-mono text-white resize-none overflow-y-auto"
            placeholder="Enter your input here"
            value={input}
            onChange={handleInputChange}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};
