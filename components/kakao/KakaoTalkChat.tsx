import { StatusBar } from "./StatusBar";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { ImageMessage } from "./ImageMessage";
import { ChatInput } from "./ChatInput";
import { KakaoTalkChatProps, Message } from "./types";

export function KakaoTalkChat({
  messages,
  chatTitle,
  onSendMessage,
  onAttach,
  className = "",
}: KakaoTalkChatProps) {
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
        prevMessage.timestamp.substring(0, 5) === message.timestamp.substring(0, 5)
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
        nextMessage.timestamp.substring(0, 5) === message.timestamp.substring(0, 5)
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
      className={`w-full max-w-sm mx-auto h-[844px] bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col ${className}`}
    >
      {/* Status Bar */}
      <StatusBar time="4:24" />

      {/* Chat Header */}
      <ChatHeader
        title={chatTitle}
        onBack={() => console.log("Back clicked")}
        onSearch={() => console.log("Search clicked")}
        onMenu={() => console.log("Menu clicked")}
      />

      {/* Messages Area */}
      <div className="flex-1 bg-blue-100 p-4 overflow-y-auto">
        {messages.map((message, index) => renderMessage(message, index))}
      </div>

      {/* Input Area */}
      <ChatInput
        onSendMessage={onSendMessage}
        onAttach={onAttach}
        onEmoji={() => console.log("Emoji clicked")}
        onMore={() => console.log("More clicked")}
      />

      {/* Home Indicator */}
      <div className="bg-white pb-2 flex justify-center">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}
