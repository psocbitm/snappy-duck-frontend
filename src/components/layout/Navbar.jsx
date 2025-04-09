import { RunButton } from "./RunButton";
import { SwitchLanguage } from "./SwitchLanguage";
import logo from "../../assets/logo.svg";
export const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-2 m-2 bg-[#1e1e1e] rounded-md gap-2 md:gap-0">
      <div className="text-white text-lg font-mono flex flex-row items-center gap-2">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <span className="text-white text-lg font-mono">Snappy Duck</span>
      </div>
      <div className="flex flex-row justify-between w-full md:w-auto gap-2">
        <SwitchLanguage />
        <RunButton />
      </div>
    </div>
  );
};
