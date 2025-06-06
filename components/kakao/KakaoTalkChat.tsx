import { useEffect, useRef } from "react";
import { StatusBar } from "./StatusBar";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { ImageMessage } from "./ImageMessage";
import { ChatInput } from "./ChatInput";
import { KakaoTalkChatProps, Message } from "./types";

export function KakaoTalkChat({
  messages,
  chatTitle,
  className = "",
}: KakaoTalkChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const renderMessage = (message: Message, index: number) => {
    let showSenderInfo = true;
    let showTimestamp = true;

    // Check with previous message for sender info (avatar/name)
    if (index > 0) {
      const prevMessage = messages[index - 1];
      // Hide sender info if previous message is:
      // 1. From same sender
      // 2. In same minute
      if (
        prevMessage.sender.id === message.sender.id &&
        prevMessage.timestamp.getHours() === message.timestamp.getHours() &&
        prevMessage.timestamp.getMinutes() === message.timestamp.getMinutes()
      ) {
        showSenderInfo = false;
      }
    }

    // Check with next message for timestamp
    if (index < messages.length - 1) {
      const nextMessage = messages[index + 1];
      // Hide timestamp if next message is:
      // 1. From same sender
      // 2. In same minute
      if (
        nextMessage.sender.id === message.sender.id &&
        nextMessage.timestamp.getHours() === message.timestamp.getHours() &&
        nextMessage.timestamp.getMinutes() === message.timestamp.getMinutes()
      ) {
        showTimestamp = false;
      }
    }

    if (message.type === "text") {
      return (
        <MessageBubble
          key={message.id}
          message={message}
          showSenderInfo={showSenderInfo}
          showTimestamp={showTimestamp}
        />
      );
    } else if (message.type === "image") {
      return (
        <ImageMessage
          key={message.id}
          message={message}
        />
      );
    }
    return null;
  };

  return (
    <div
      className={`w-full min-w-[375px] max-w-sm mx-auto h-[844px] bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col ${className}`}
    >
      {/* Status Bar */}
      <StatusBar time="4:24" />

      {/* Chat Header */}
      <ChatHeader title={chatTitle} />

      {/* Messages Area */}
      <div className="flex-1 bg-blue-100 p-4 overflow-y-auto">
        {messages.map((message, index) => renderMessage(message, index))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput />

      {/* Home Indicator */}
      <div className="bg-white pb-2 flex justify-center">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}
