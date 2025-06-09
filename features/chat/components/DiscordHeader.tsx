import { Hash, Users, Search, Bell, Pin, Inbox, HelpCircle } from "lucide-react";
import { DiscordHeaderProps } from "./discord-types";

export function DiscordHeader({ 
  channelName, 
  serverName, 
  memberCount = 1 
}: DiscordHeaderProps) {
  return (
    <div 
      data-testid="discord-header" 
      className="bg-gray-700 border-b border-gray-600 px-4 py-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <Hash 
          data-testid="channel-icon" 
          className="w-6 h-6 text-gray-400" 
        />
        <div className="flex flex-col">
          <span className="text-white font-semibold text-lg">
            #{channelName}
          </span>
          <span className="text-gray-400 text-xs">
            {serverName}
          </span>
        </div>
      </div>

      <div 
        data-testid="header-actions" 
        className="flex items-center gap-4"
      >
        <div className="flex items-center gap-1 text-gray-400">
          <Users className="w-4 h-4" />
          <span className="text-sm">{memberCount}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-gray-300 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-gray-300 transition-colors">
            <Inbox className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-gray-300 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-gray-300 transition-colors">
            <Pin className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-gray-300 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}