import React from "react";
import Image from "next/image";
import type { Message } from "@/features/chat/components/types";

interface InstagramChatMessageProps {
  message: Message;
  showSender: boolean;
  showTimestamp: boolean;
  showAvatar: boolean;
  senderName?: string;
  senderAvatar?: string;
}

export function InstagramChatMessage({
  message,
  showSender,
  showTimestamp,
  showAvatar,
  senderName,
  senderAvatar,
}: InstagramChatMessageProps) {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (message.isUser) {
    // User's message (right-aligned, purple background)
    return (
      <div className="flex justify-end mb-2 px-4">
        <div className="max-w-xs">
          <div
            className="bg-[#8B3DFF] text-white px-4 py-2 rounded-[18px] break-words"
            data-testid="message-bubble"
          >
            {message.type === "text" ? (
              <span>{message.content}</span>
            ) : (
              <Image
                src={message.imageUrl}
                alt={message.alt}
                width={200}
                height={150}
                className="rounded-lg max-w-full h-auto"
              />
            )}
          </div>
          {showTimestamp && (
            <div className="text-xs text-gray-500 mt-1 text-right">
              {formatTime(message.timestamp)}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Other user's message (left-aligned, light gray background)
  return (
    <div className="flex items-start mb-2 px-4">
      {showAvatar && senderAvatar && (
        <div className="mr-2 flex-shrink-0">
          <Image
            src={senderAvatar}
            alt={senderName || "User"}
            width={28}
            height={28}
            className="rounded-full object-cover"
            data-testid="message-avatar"
          />
        </div>
      )}
      
      <div className="max-w-xs">
        {showSender && senderName && (
          <div className="text-xs text-gray-600 mb-1 font-medium">
            {senderName}
          </div>
        )}
        
        <div
          className="bg-gray-100 text-gray-900 px-4 py-2 rounded-[18px] break-words"
          data-testid="message-bubble"
        >
          {message.type === "text" ? (
            <span>{message.content}</span>
          ) : (
            <Image
              src={message.imageUrl}
              alt={message.alt}
              width={200}
              height={150}
              className="rounded-lg max-w-full h-auto"
            />
          )}
        </div>
        
        {showTimestamp && (
          <div className="text-xs text-gray-500 mt-1">
            {formatTime(message.timestamp)}
          </div>
        )}
      </div>
    </div>
  );
}