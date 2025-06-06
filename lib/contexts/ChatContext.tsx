"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Message, User } from "@/components/kakao/types";
import { MessageFormData } from "@/lib/schemas/message";

interface ChatContextType {
  messages: Message[];
  currentUser: User;
  otherUser: User;
  addMessage: (data: MessageFormData) => void;
  editMessage: (id: string, data: Partial<MessageFormData>) => void;
  deleteMessage: (id: string) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
  initialMessages?: Message[];
  currentUser: User;
  otherUser: User;
}

export function ChatProvider({
  children,
  initialMessages = [],
  currentUser,
  otherUser,
}: ChatProviderProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const addMessage = (data: MessageFormData) => {
    // Create Date from hour and minute
    const timestampDate = new Date();
    timestampDate.setHours(data.hour, data.minute, 0, 0);

    const baseMessage = {
      id: Date.now().toString(),
      sender: data.isUserMessage ? currentUser : otherUser,
      timestamp: timestampDate,
      isUser: data.isUserMessage,
    };

    const newMessage: Message =
      data.type === "text"
        ? {
            ...baseMessage,
            type: "text",
            content: data.content || "",
          }
        : {
            ...baseMessage,
            type: "image",
            imageUrl: data.imageUrl!,
            alt: data.imageAlt || "Uploaded image",
          };

    setMessages((prev) => [...prev, newMessage]);
  };

  const editMessage = (id: string, data: Partial<MessageFormData>) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id !== id) return message;

        // Create updated timestamp if hour/minute are provided
        let timestamp = message.timestamp;
        if (data.hour !== undefined || data.minute !== undefined) {
          timestamp = new Date(message.timestamp);
          if (data.hour !== undefined) timestamp.setHours(data.hour);
          if (data.minute !== undefined) timestamp.setMinutes(data.minute);
        }

        // Update sender if isUserMessage changed
        let sender = message.sender;
        if (data.isUserMessage !== undefined) {
          sender = data.isUserMessage ? currentUser : otherUser;
        }

        // Handle type changes and content updates
        if (data.type === "text" && data.content !== undefined) {
          return {
            ...message,
            type: "text",
            content: data.content,
            sender,
            timestamp,
            isUser: data.isUserMessage ?? message.isUser,
          } as Message;
        } else if (data.type === "image" && data.imageUrl !== undefined) {
          return {
            ...message,
            type: "image",
            imageUrl: data.imageUrl,
            alt: data.imageAlt || "Uploaded image",
            sender,
            timestamp,
            isUser: data.isUserMessage ?? message.isUser,
          } as Message;
        } else {
          // Only update non-content fields
          return {
            ...message,
            sender,
            timestamp,
            isUser: data.isUserMessage ?? message.isUser,
          };
        }
      })
    );
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        currentUser,
        otherUser,
        addMessage,
        editMessage,
        deleteMessage,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
