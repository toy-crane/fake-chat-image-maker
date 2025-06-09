"use client";

import { AppleStatusBar } from "./AppleStatusBar";
import { AppleHeader } from "./AppleHeader";
import { AppleChatMessage } from "./AppleChatMessage";
import { AppleChatInput } from "./AppleChatInput";
import { useChatContext } from "@/contexts/ChatContext";
import { Message } from "./types";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas-pro";
import { format, isSameDay } from "date-fns";

interface AppleMessageChatProps {
  className?: string;
  onExport?: () => void;
}

const DEFAULT_TIME = "8:41";
const CHAT_CONTAINER_CLASSES = "w-[375px] max-w-sm mx-auto h-[844px] bg-gray-50 rounded-3xl overflow-hidden shadow-xl flex flex-col";

export function AppleMessageChat({
  className = "",
  onExport,
}: AppleMessageChatProps) {
  const { messages, otherUser } = useChatContext();

  const exportAsImage = async () => {
    const element = document.getElementById("apple-message-chat");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: false,
        scale: 4,
        backgroundColor: '#F2F2F7',
      });

      const link = document.createElement("a");
      link.download = `apple-messages-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();

      onExport?.();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: Array<{ date: Date; messages: Message[] }> = [];
    
    messages.forEach((message) => {
      const lastGroup = groups[groups.length - 1];
      
      if (!lastGroup || !isSameDay(lastGroup.date, message.timestamp)) {
        groups.push({
          date: message.timestamp,
          messages: [message],
        });
      } else {
        lastGroup.messages.push(message);
      }
    });
    
    return groups;
  };

  const renderDateGroup = (group: { date: Date; messages: Message[] }, groupIndex: number) => {
    return (
      <div key={groupIndex} data-testid="apple-date-group" className="mb-4">
        <div className="flex justify-center mb-3">
          <div data-testid="apple-timestamp" className="text-xs text-gray-500 px-3 py-1 bg-white/80 rounded-full">
            {format(group.date, "EEE, MMM d 'at' h:mm a")}
          </div>
        </div>
        {group.messages.map((message, index) => renderMessage(message, index, group.messages))}
      </div>
    );
  };

  const renderMessage = (message: Message, index: number, groupMessages: Message[]) => {
    const isLastInGroup = index === groupMessages.length - 1;
    const nextMessage = groupMessages[index + 1];
    const showTail = isLastInGroup || 
      (nextMessage && nextMessage.isUser !== message.isUser);

    return (
      <div
        key={message.id}
        className="mb-1"
      >
        <AppleChatMessage
          message={message}
          isLastInGroup={showTail}
        />
      </div>
    );
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div
      id="apple-message-chat"
      data-testid="apple-message-chat"
      className={`${CHAT_CONTAINER_CLASSES} ${className}`}
    >
      <AppleStatusBar time={DEFAULT_TIME} />
      <AppleHeader contactName={otherUser?.name || "Contact"} />

      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
        {messageGroups.map((group, index) => renderDateGroup(group, index))}
      </div>
      
      <AppleChatInput />
      
      <div className="bg-gray-50 pb-2 flex justify-center">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>

      <Button
        onClick={exportAsImage}
        className="absolute top-2 right-2 z-10 opacity-50 hover:opacity-100"
        variant="ghost"
        size="sm"
      >
        Export
      </Button>
    </div>
  );
}