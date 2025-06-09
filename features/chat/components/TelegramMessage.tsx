import Image from "next/image";
import { ChatMessageProps } from "./types";
import { format } from "date-fns";

export function TelegramMessage({
  message,
  showTimestamp = true,
}: ChatMessageProps) {
  const { timestamp, isUser } = message;

  const formatTime = (date: Date) => {
    return format(date, "h:mm a");
  };

  const renderContent = () => {
    if (message.type === "text") {
      return (
        <div className={`rounded-2xl px-3 py-2 max-w-xs ${
          isUser 
            ? "bg-emerald-500 text-white" 
            : "bg-white text-black shadow-sm"
        }`}>
          <span className="text-sm">{message.content}</span>
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

  return (
    <div className={`flex mb-2 ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="flex flex-col">
        {renderContent()}
        {showTimestamp && (
          <span className={`text-xs text-gray-500 mt-1 ${
            isUser ? "text-right" : "text-left"
          }`}>
            {formatTime(timestamp)}
          </span>
        )}
      </div>
    </div>
  );
}