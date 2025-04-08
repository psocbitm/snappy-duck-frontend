export const OutputContainer = () => {
  return (
    <div className="w-full h-full bg-primary p-1">
      <div className="w-full h-full bg-[#1e1e1e] rounded-md p-2">
        <textarea
          className="w-full h-auto min-h-full bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0
          placeholder:text-gray-400 font-mono text-white resize-none"
          placeholder="Output will appear here"
          readOnly
        />
      </div>
    </div>
  );
};
