import Image from "next/image";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DiscordMessageProps } from "./discord-types";

const USERNAME_COLORS = [
  "text-red-400",
  "text-blue-400", 
  "text-green-400",
  "text-yellow-400",
  "text-purple-400",
  "text-pink-400",
  "text-indigo-400",
  "text-orange-400",
];

export function DiscordMessage({
  message,
  showSenderInfo = true,
  showTimestamp = true,
}: DiscordMessageProps) {
  const { sender, timestamp } = message;

  const formatTime = (date: Date) => {
    return format(date, "h:mm a");
  };

  const getUsernameColor = (userId: string) => {
    const index = userId.charCodeAt(0) % USERNAME_COLORS.length;
    return USERNAME_COLORS[index];
  };

  const renderMessageContent = () => {
    if (message.type === "text") {
      return (
        <span className="text-gray-100 text-sm leading-relaxed">
          {message.content}
        </span>
      );
    } else if (message.type === "image") {
      return (
        <div className="mt-1">
          <Image
            src={message.imageUrl}
            alt={message.alt}
            width={300}
            height={300}
            className="rounded-lg max-w-sm"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      data-testid="discord-message"
      className={`flex gap-3 px-4 py-1 hover:bg-gray-700/30 group ${
        !showSenderInfo ? "ml-12" : ""
      }`}
    >
      {showSenderInfo ? (
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage
            src={sender.avatar || undefined}
            alt={sender.name}
          />
          <AvatarFallback className="bg-gray-600 text-gray-300 text-sm">
            {sender.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-10 h-10 flex-shrink-0 flex items-start pt-0.5">
          {showTimestamp && (
            <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
              {formatTime(timestamp)}
            </span>
          )}
        </div>
      )}

      <div className="flex-1 min-w-0">
        {showSenderInfo && (
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className={`font-medium text-sm ${getUsernameColor(sender.id)}`}>
              {sender.name}
            </span>
            {showTimestamp && (
              <span className="text-xs text-gray-500">
                {formatTime(timestamp)}
              </span>
            )}
          </div>
        )}
        
        <div className="text-sm">
          {renderMessageContent()}
        </div>
      </div>
    </div>
  );
}