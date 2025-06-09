import { StatusBarProps } from "./types";

export function TelegramStatusBar({ time }: StatusBarProps) {
  return (
    <div className="bg-gray-100 px-4 py-1.5 flex items-center justify-between text-black text-sm font-medium">
      <div className="flex items-center gap-1">
        <span>{time}</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex gap-0.5">
          <div className="w-1 h-3 bg-black rounded-full"></div>
          <div className="w-1 h-3 bg-black rounded-full"></div>
          <div className="w-1 h-3 bg-black rounded-full"></div>
          <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
        </div>
        <div className="ml-1">
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path d="M1 7C1 7 3 5 5 5C7 5 9 7 9 7C9 7 11 5 13 5C15 5 17 7 17 7V9H1V7Z" stroke="black" strokeWidth="1" fill="none"/>
            <circle cx="2" cy="3" r="1" fill="black"/>
            <circle cx="6" cy="3" r="1" fill="black"/>
            <circle cx="10" cy="3" r="1" fill="black"/>
            <circle cx="14" cy="3" r="1" fill="black"/>
          </svg>
        </div>
        <div className="w-6 h-3 border border-black rounded-sm">
          <div className="w-4 h-2 bg-black rounded-sm m-0.5"></div>
        </div>
      </div>
    </div>
  );
}