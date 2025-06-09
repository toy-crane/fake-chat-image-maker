import Image from "next/image";
import { Message } from "./types";

interface AppleChatMessageProps {
  message: Message;
  isLastInGroup?: boolean;
}

export function AppleChatMessage({ message, isLastInGroup = false }: AppleChatMessageProps) {
  const isUser = message.isUser;
  
  const bubbleClasses = isUser
    ? "bg-green-500 text-white ml-12"
    : "bg-gray-200 text-black mr-12";
  
  const containerClasses = isUser
    ? "justify-end"
    : "justify-start";

  const tailClasses = isUser
    ? "absolute -bottom-0.5 -right-1 w-3 h-3 bg-green-500 transform rotate-45 rounded-br"
    : "absolute -bottom-0.5 -left-1 w-3 h-3 bg-gray-200 transform rotate-45 rounded-bl";

  return (
    <div 
      data-testid="apple-message-container"
      className={`flex ${containerClasses} mb-1`}
    >
      <div className="relative max-w-xs">
        <div
          data-testid={isUser ? "apple-message-outgoing" : "apple-message-incoming"}
          className={`px-4 py-2 rounded-2xl relative ${bubbleClasses}`}
        >
          {message.type === "text" && (
            <p className="text-sm leading-relaxed break-words">
              {message.content}
            </p>
          )}
          
          {message.type === "image" && (
            <div className="rounded-lg overflow-hidden">
              <Image
                src={message.imageUrl || ""}
                alt={message.alt || "Image"}
                width={200}
                height={150}
                className="object-cover"
              />
            </div>
          )}
        </div>
        
        {isLastInGroup && (
          <div 
            data-testid="apple-message-tail"
            className={tailClasses}
          />
        )}
      </div>
    </div>
  );
}