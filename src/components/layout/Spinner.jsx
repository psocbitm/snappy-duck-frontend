import { LoaderCircleIcon } from "lucide-react";

export const Spinner = ({ size = 12 }) => {
  return (
    <div className="flex items-center justify-center">
      <LoaderCircleIcon className={`size-${size} animate-spin text-gray-400`} />
    </div>
  );
};