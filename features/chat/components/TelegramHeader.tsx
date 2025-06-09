import { ChevronLeft } from "lucide-react";
import { ChatHeaderProps } from "./types";

export function TelegramHeader({ title }: ChatHeaderProps) {
  return (
    <div className="bg-gray-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-1">
          <ChevronLeft className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-medium text-black">{title}</span>
          <span className="text-xs text-gray-500">last seen recently</span>
        </div>
      </div>
    </div>
  );
}