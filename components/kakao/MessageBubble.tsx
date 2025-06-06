import { MessageBubbleProps } from "./types";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function MessageBubble({
  message,
  showSenderInfo = true,
  showTimestamp = true,
}: MessageBubbleProps) {
  const { content, sender, timestamp, isUser } = message;

  const formatTime = (date: Date) => {
    return format(date, "h:mm a");
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-2">
        <div className="flex items-end gap-2">
          {showTimestamp && (
            <span className="text-xs text-gray-500 mb-1">
              {formatTime(timestamp)}
            </span>
          )}
          <div className="bg-yellow-300 rounded-2xl rounded-tr-md px-3 py-2 max-w-xs">
            <span className="text-black">{content}</span>
          </div>
        </div>
      </div>
    );
  }

  console.log(showSenderInfo, sender);

  return (
    <div className="flex items-start gap-2 mb-2">
      {showSenderInfo ? (
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage
            src={sender.avatar}
            alt={sender.name}
          />
          <AvatarFallback className="text-sm">{sender.name}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-10 h-10 flex-shrink-0" />
      )}
      <div className="flex flex-col">
        {showSenderInfo && (
          <span className="text-sm font-medium text-gray-700 mb-1">
            {sender.name}
          </span>
        )}
        <div className="flex items-end gap-2">
          <div className="bg-white rounded-2xl rounded-tl-md px-3 py-2 max-w-xs shadow-sm">
            <span className="text-black">{content}</span>
          </div>
          {showTimestamp && (
            <span className="text-xs text-gray-500 mb-1">
              {formatTime(timestamp)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
