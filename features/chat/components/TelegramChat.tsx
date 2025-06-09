import { TelegramStatusBar } from "./TelegramStatusBar";
import { TelegramHeader } from "./TelegramHeader";
import { TelegramMessage } from "./TelegramMessage";
import { TelegramInput } from "./TelegramInput";
import { TelegramChatProps, Message } from "./types";

const DEFAULT_TIME = "9:41";
const CHAT_CONTAINER_CLASSES = "w-[375px] max-w-sm mx-auto h-[844px] bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col";

const TELEGRAM_PATTERN_BACKGROUND = `
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23dcf8c6' fill-opacity='0.1' fill-rule='nonzero'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-color: #dcf8c6;
`;

export function TelegramChat({
  messages,
  chatTitle,
  className = "",
}: TelegramChatProps) {
  const renderMessage = (message: Message, index: number) => {
    let showTimestamp = true;

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
      <TelegramMessage
        key={message.id}
        message={message}
        showTimestamp={showTimestamp}
      />
    );
  };

  return (
    <div
      className={`${CHAT_CONTAINER_CLASSES} ${className}`}
    >
      <TelegramStatusBar time={DEFAULT_TIME} />
      <TelegramHeader title={chatTitle} />

      <div 
        className="flex-1 p-3 overflow-y-auto relative"
        style={{ backgroundColor: "#dcf8c6" }}
      >
        {/* Background pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M30 30c11.046 0 20-8.954 20-20S41.046-10 30-10 10 18.954 10 30s8.954 20 20 20zM10 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px"
          }}
        />
        
        {/* Date separator */}
        <div className="flex justify-center mb-4 relative z-10">
          <div className="bg-white bg-opacity-80 rounded-full px-3 py-1">
            <span className="text-xs text-gray-600">Today</span>
          </div>
        </div>

        {/* Messages */}
        <div className="relative z-10">
          {messages.map((message, index) => renderMessage(message, index))}
        </div>
      </div>

      <TelegramInput />
      
      {/* Bottom branding */}
      <div className="bg-gray-100 px-4 py-2 flex justify-center items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">t</span>
          </div>
          <span className="text-sm font-medium text-gray-800">Telegram</span>
        </div>
        <span className="text-xs text-gray-500">curated by</span>
        <span className="text-xs font-medium text-gray-700">Mobbin</span>
      </div>
      
      <div className="bg-gray-100 pb-2 flex justify-center">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}