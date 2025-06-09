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
      <div className="flex justify-end mb-1 px-4">
        <div className="max-w-[250px]">
          <div
            className="bg-[#8B3DFF] text-white px-4 py-3 rounded-[22px] break-words text-[15px] leading-[20px]"
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
            <div className="text-xs text-gray-400 mt-1 text-right font-normal">
              {formatTime(message.timestamp)}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Other user's message (left-aligned, very light gray background)
  return (
    <div className="flex items-start mb-1 px-4">
      {showAvatar && senderAvatar && (
        <div className="mr-3 flex-shrink-0">
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
      
      <div className="max-w-[250px]">
        {showSender && senderName && (
          <div className="text-xs text-gray-600 mb-1 font-medium">
            {senderName}
          </div>
        )}
        
        <div
          className="bg-gray-50 border border-gray-100 text-gray-900 px-4 py-3 rounded-[22px] break-words text-[15px] leading-[20px]"
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
          <div className="text-xs text-gray-400 mt-1 font-normal">
            {formatTime(message.timestamp)}
          </div>
        )}
      </div>
    </div>
  );
}