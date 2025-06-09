import Image from "next/image";
import { InstagramMessageProps } from "./types";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function InstagramMessage({
  message,
  showSenderInfo = true,
  showTimestamp = true,
}: InstagramMessageProps) {
  const { sender, timestamp, isUser } = message;

  const formatTime = (date: Date) => {
    return format(date, "h:mm a");
  };

  const renderContent = () => {
    if (message.type === "text") {
      return (
        <div 
          data-testid="message-bubble"
          className="bg-gray-700 rounded-2xl px-3 py-2 max-w-xs"
        >
          <span className="text-gray-100 text-sm">{message.content}</span>
        </div>
      );
    } else if (message.type === "image") {
      return (
        <div className="max-w-xs">
          <Image
            src={message.imageUrl}
            alt={message.alt}
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>
      );
    }
    return null;
  };

  const renderUserContent = () => {
    if (message.type === "text") {
      return (
        <div 
          data-testid="message-bubble"
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl px-3 py-2 max-w-xs"
        >
          <span className="text-white text-sm">{message.content}</span>
        </div>
      );
    } else if (message.type === "image") {
      return (
        <div className="max-w-xs">
          <Image
            src={message.imageUrl}
            alt={message.alt}
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>
      );
    }
    return null;
  };

  if (isUser) {
    return (
      <div 
        data-testid={`instagram-message-${message.id}`}
        className="flex justify-end mb-2"
      >
        <div className="flex items-end gap-2">
          {showTimestamp && (
            <span 
              data-testid="message-timestamp"
              className="text-gray-400 text-xs mb-1 whitespace-nowrap"
            >
              {formatTime(timestamp)}
            </span>
          )}
          {renderUserContent()}
        </div>
      </div>
    );
  }

  return (
    <div 
      data-testid={`instagram-message-${message.id}`}
      className="flex justify-start items-start gap-2 mb-2"
    >
      {showSenderInfo ? (
        <Avatar 
          data-testid="sender-avatar"
          className="w-8 h-8 flex-shrink-0"
        >
          <AvatarImage
            src={sender.avatar || undefined}
            alt={sender.name}
          />
          <AvatarFallback className="text-sm bg-gray-600 text-white">
            {sender.name}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div 
          data-testid="avatar-spacer"
          className="w-8 h-8 flex-shrink-0" 
        />
      )}
      <div className="flex flex-col">
        <div className="flex items-end gap-2">
          {renderContent()}
          {showTimestamp && (
            <span 
              data-testid="message-timestamp"
              className="text-gray-400 text-xs mb-1 whitespace-nowrap"
            >
              {formatTime(timestamp)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}