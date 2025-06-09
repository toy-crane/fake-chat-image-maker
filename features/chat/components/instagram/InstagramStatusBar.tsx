import React from "react";

const SIGNAL_BARS = [
  { strength: 1, height: "h-1" },
  { strength: 2, height: "h-2" },
  { strength: 3, height: "h-3" },
  { strength: 4, height: "h-4" },
];

const WIFI_STRENGTH = [
  { level: 1, opacity: "opacity-100" },
  { level: 2, opacity: "opacity-100" },
  { level: 3, opacity: "opacity-100" },
];

export function InstagramStatusBar() {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div
      className="flex items-center justify-between px-4 py-2 bg-white text-black text-sm font-medium"
      data-testid="instagram-status-bar"
    >
      {/* Time */}
      <div data-testid="status-time" className="font-semibold">
        {currentTime}
      </div>

      {/* Right side indicators */}
      <div className="flex items-center space-x-1">
        {/* Signal strength */}
        <div className="flex items-end space-x-px" data-testid="signal-indicator">
          {SIGNAL_BARS.map((bar) => (
            <div
              key={bar.strength}
              className={`w-1 bg-black ${bar.height}`}
            />
          ))}
        </div>

        {/* WiFi indicator */}
        <div className="ml-1" data-testid="wifi-indicator">
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            className="text-black"
          >
            <path
              d="M1.5 6.5C3.5 4.5 6 3.5 7.5 3.5C9 3.5 11.5 4.5 13.5 6.5"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M3.5 8.5C4.5 7.5 6 7 7.5 7C9 7 10.5 7.5 11.5 8.5"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="7.5" cy="10" r="1" fill="currentColor" />
          </svg>
        </div>

        {/* Battery indicator */}
        <div className="ml-1" data-testid="battery-indicator">
          <div className="relative">
            <div className="w-6 h-3 border border-black rounded-sm">
              <div className="w-4/5 h-full bg-black rounded-sm"></div>
            </div>
            <div className="absolute -right-0.5 top-1 w-0.5 h-1 bg-black rounded-r-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}