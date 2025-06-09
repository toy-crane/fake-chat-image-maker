import { InstagramStatusBar } from "./InstagramStatusBar";
import { InstagramHeader } from "./InstagramHeader";
import { InstagramMessage } from "./InstagramMessage";
import { InstagramInput } from "./InstagramInput";
import { InstagramDMChatProps, Message } from "./types";

const DEFAULT_TIME = "9:41";
const CHAT_CONTAINER_CLASSES = "w-[375px] max-w-sm mx-auto h-[844px] bg-black rounded-3xl overflow-hidden shadow-xl flex flex-col";

export function InstagramDMChat({
  messages,
  chatTitle,
  className = "",
}: InstagramDMChatProps) {
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
        className={addExtraMargin ? "mt-4" : ""}
      >
        <InstagramMessage
          message={message}
          showSenderInfo={showSenderInfo}
          showTimestamp={showTimestamp}
        />
      </div>
    );
  };

  return (
    <div
      data-testid="instagram-dm-container"
      className={`${CHAT_CONTAINER_CLASSES} ${className}`}
    >
      <InstagramStatusBar time={DEFAULT_TIME} />
      <InstagramHeader title={chatTitle} />

      <div className="flex-1 bg-black p-4 overflow-y-auto">
        {messages.map((message, index) => renderMessage(message, index))}
      </div>
      
      <InstagramInput />
      
      <div className="bg-black pb-2 flex justify-center">
        <div className="w-32 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  );
}