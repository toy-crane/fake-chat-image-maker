interface AppleStatusBarProps {
  time: string;
}

export function AppleStatusBar({ time }: AppleStatusBarProps) {
  return (
    <div 
      data-testid="apple-status-bar"
      className="bg-gray-50 px-5 py-2 flex justify-between items-center text-black text-sm font-medium"
    >
      <div className="flex items-center">
        <span>{time}</span>
        <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.5 5.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5z"/>
          <path d="M9.5 11.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5z"/>
          <path d="M9.5 17.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5z"/>
        </svg>
      </div>

      <div className="flex items-center space-x-1">
        {/* Signal strength */}
        <div className="flex items-end space-x-0.5">
          <div className="w-1 h-1 bg-black rounded-full"></div>
          <div className="w-1 h-2 bg-black rounded-full"></div>
          <div className="w-1 h-3 bg-black rounded-full"></div>
          <div className="w-1 h-4 bg-black rounded-full"></div>
        </div>

        {/* WiFi icon */}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6.36-8c-2.53-2.53-5.81-3.92-9.36-3.92s-6.83 1.39-9.36 3.92l1.42 1.42c2.05-2.05 4.78-3.18 7.94-3.18s5.89 1.13 7.94 3.18L20.36 11z"/>
        </svg>

        {/* Battery */}
        <div className="flex items-center">
          <div className="w-6 h-3 border border-black rounded-sm relative">
            <div className="w-4 h-1.5 bg-black rounded-sm absolute left-0.5 top-0.5"></div>
          </div>
          <div className="w-0.5 h-1 bg-black rounded-r-sm ml-0.5"></div>
        </div>
      </div>
    </div>
  );
}