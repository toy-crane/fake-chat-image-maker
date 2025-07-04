import { StatusBar } from "./StatusBar";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { KakaoTalkChatProps, Message } from "./types";

const DEFAULT_TIME = "4:24";
const CHAT_CONTAINER_CLASSES = "w-[375px] max-w-sm mx-auto h-[844px] bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col";

export function KakaoTalkChat({
  messages,
  chatTitle,
  className = "",
}: KakaoTalkChatProps) {
  const renderMessage = (message: Message, index: number) => {
    let showSenderInfo = true;
    let showTimestamp = true;
    let addExtraMargin = false;

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
      } else {
        // Add extra margin when switching between different senders
        addExtraMargin = true;
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

    return (
      <div
        key={message.id}
        className={addExtraMargin ? "mt-3" : ""}
      >
        <ChatMessage
          message={message}
          showSenderInfo={showSenderInfo}
          showTimestamp={showTimestamp}
        />
      </div>
    );
  };

  return (
    <div
      className={`${CHAT_CONTAINER_CLASSES} ${className}`}
    >
      <StatusBar time={DEFAULT_TIME} />
      <ChatHeader title={chatTitle} />

      <div className="flex-1 bg-blue-100 p-3 overflow-y-auto">
        {messages.map((message, index) => renderMessage(message, index))}
      </div>
      <ChatInput />
      <div className="bg-white pb-2 flex justify-center">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}
