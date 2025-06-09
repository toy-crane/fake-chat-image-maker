import { InstagramStatusBarProps } from "./types";

export function InstagramStatusBar({ time }: InstagramStatusBarProps) {
  return (
    <div 
      data-testid="instagram-status-bar"
      className="bg-black px-4 py-2 flex justify-between items-center text-white text-sm"
    >
      <div className="flex items-center gap-1">
        <span>{time}</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white/60 rounded-full"></div>
        </div>
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 ml-1 fill-white"
        >
          <path d="M2 15h20v2H2zm1.15-4.05L4 9.47l.85 1.48L8 10.55V7.87h2v2.68l3.15-1.55.85-1.48.85 1.48L18 9.47l.85 1.48L22 10.05v2l-3.15-1.55-1.55-1.48-.85 1.48-1.55 1.55L12 10.45l-2.9 1.6-1.55-1.55-.85-1.48-1.55 1.48L2 12.05v-2z"/>
        </svg>
        <span className="ml-1 text-xs">100%</span>
      </div>
    </div>
  );
}