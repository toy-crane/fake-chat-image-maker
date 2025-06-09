import React, { useRef } from "react";
import { InstagramStatusBar } from "./InstagramStatusBar";
import { InstagramChatHeader } from "./InstagramChatHeader";
import { InstagramChatMessage } from "./InstagramChatMessage";
import { InstagramChatInput } from "./InstagramChatInput";
import { useChatContext } from "@/contexts/ChatContext";

interface InstagramDMChatProps {
  onExportChat: (element: HTMLElement) => void;
}

export function InstagramDMChat({ onExportChat }: InstagramDMChatProps) {
  const { messages, currentUser, otherUser, addMessage } = useChatContext();
  const chatRef = useRef<HTMLDivElement>(null);

  const instagramUser = {
    id: otherUser?.id || "user1",
    name: otherUser?.name || "이동범",
    avatar: otherUser?.avatar || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNEREREREQiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9zdmc+Cjwvc3ZnPgo=",
    username: "dongbumss",
  };

  const handleSendMessage = (content: string) => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    
    addMessage({
      type: "text",
      content,
      isUserMessage: true,
      time: timeString,
    });
  };

  const handleExportChat = () => {
    if (chatRef.current) {
      onExportChat(chatRef.current);
    }
  };

  return (
    <div
      ref={chatRef}
      className="w-[375px] h-[844px] bg-white rounded-[20px] overflow-hidden shadow-lg mx-auto flex flex-col"
      style={{ width: "375px", height: "844px" }}
      data-testid="instagram-dm-chat"
      onContextMenu={(e) => {
        e.preventDefault();
        handleExportChat();
      }}
    >
      {/* Status Bar */}
      <InstagramStatusBar />

      {/* Chat Header */}
      <InstagramChatHeader
        user={instagramUser}
        onBack={() => console.log("Back clicked")}
        onPhoneCall={() => console.log("Phone call clicked")}
        onVideoCall={() => console.log("Video call clicked")}
      />

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto bg-white"
        data-testid="instagram-message-list"
      >
        <div className="py-4">
          {messages.map((message, index) => {
            const previousMessage = messages[index - 1];
            const nextMessage = messages[index + 1];

            // In Instagram style, we show avatar for every message from others
            const showAvatar = !message.isUser;
            const showSender = !message.isUser && (!previousMessage || previousMessage.isUser || previousMessage.sender !== message.sender);
            const showTimestamp = !nextMessage || nextMessage.sender !== message.sender || nextMessage.isUser !== message.isUser;

            const senderUser = message.isUser ? currentUser : otherUser;

            return (
              <InstagramChatMessage
                key={message.id}
                message={message}
                showSender={showSender}
                showTimestamp={showTimestamp}
                showAvatar={showAvatar}
                senderName={senderUser?.name}
                senderAvatar={senderUser?.avatar}
              />
            );
          })}
        </div>
      </div>

      {/* Input Area */}
      <InstagramChatInput
        onSendMessage={handleSendMessage}
        onCamera={() => console.log("Camera clicked")}
        onMicrophone={() => console.log("Microphone clicked")}
        onGallery={() => console.log("Gallery clicked")}
        onSticker={() => console.log("Sticker clicked")}
        onMore={() => console.log("More clicked")}
      />
    </div>
  );
}