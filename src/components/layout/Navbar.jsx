import { Code2 } from "lucide-react";
import { RunButton } from "./RunButton";
import { SwitchLanguage } from "./SwitchLanguage";
export const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-2 m-1 bg-[#1e1e1e] rounded-md">
      <div className="text-lg text-white flex items-center gap-4">
        <Code2 className="size-6" />
        <span className="font-mono">Snappy Duck</span>
      </div>
      <div className="flex items-center gap-2">
        <SwitchLanguage />
        <RunButton />
      </div>
    </div>
  );
};
