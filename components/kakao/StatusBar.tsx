import { Signal, Wifi, Battery } from "lucide-react";
import { StatusBarProps } from "./types";

export function StatusBar({ time }: StatusBarProps) {
  return (
    <div className="bg-blue-100 px-4 py-1.5 flex items-center justify-between text-black text-sm font-medium">
      <div className="flex items-center gap-1">
        <span>{time}</span>
      </div>
      <div className="flex items-center gap-1">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
        <Battery className="w-3 h-3" />
      </div>
    </div>
  );
}
