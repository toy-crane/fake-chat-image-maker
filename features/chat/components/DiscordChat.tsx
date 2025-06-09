import { DiscordHeader } from "./DiscordHeader";
import { DiscordMessage } from "./DiscordMessage";
import { DiscordInput } from "./DiscordInput";
import { DiscordChatProps } from "./discord-types";
import { Message } from "./types";

const CHAT_CONTAINER_CLASSES = "w-[400px] h-[600px] bg-gray-800 rounded-lg overflow-hidden shadow-xl flex flex-col";

export function DiscordChat({
  messages,
  channelName,
  serverName,
  className = "",
}: DiscordChatProps) {
  const renderMessage = (message: Message, index: number) => {
    let showSenderInfo = true;
    let showTimestamp = true;

    // Check with previous message for sender info (avatar/name)
    if (index > 0) {
      const prevMessage = messages[index - 1];
      // Hide sender info if previous message is:
      // 1. From same sender
      // 2. Within last 5 minutes (Discord style)
      if (
        prevMessage.sender.id === message.sender.id &&
        message.timestamp.getTime() - prevMessage.timestamp.getTime() < 5 * 60 * 1000
      ) {
        showSenderInfo = false;
      }
    }

    // In Discord, timestamp is always shown on hover when sender info is hidden
    // For grouped messages, timestamp appears on hover

    return (
      <DiscordMessage
        key={message.id}
        message={message}
        showSenderInfo={showSenderInfo}
        showTimestamp={showTimestamp}
      />
    );
  };

  return (
    <div
      data-testid="discord-chat"
      className={`${CHAT_CONTAINER_CLASSES} ${className}`}
    >
      <DiscordHeader 
        channelName={channelName} 
        serverName={serverName}
        memberCount={2}
      />

      <div className="flex-1 bg-gray-800 overflow-y-auto">
        <div className="py-4">
          {messages.map((message, index) => renderMessage(message, index))}
        </div>
      </div>

      <DiscordInput channelName={channelName} />
    </div>
  );
}