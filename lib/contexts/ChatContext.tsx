"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Message, User } from "@/components/kakao/types";
import { MessageFormData, BulkImportData } from "@/lib/schemas/message";

interface ChatContextType {
  messages: Message[];
  currentUser?: User;
  otherUser?: User;
  addMessage: (data: MessageFormData) => void;
  addBulkMessages: (data: BulkImportData) => void;
  editMessage: (id: string, data: Partial<MessageFormData>) => void;
  deleteMessage: (id: string) => void;
  clearMessages: () => void;
  updateUsers: (currentUser: User, otherUser: User) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
  initialMessages?: Message[];
  currentUser?: User;
  otherUser?: User;
}

export function ChatProvider({
  children,
  initialMessages = [],
  currentUser: initialCurrentUser,
  otherUser: initialOtherUser,
}: ChatProviderProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [currentUser, setCurrentUser] = useState<User | undefined>(initialCurrentUser);
  const [otherUser, setOtherUser] = useState<User | undefined>(initialOtherUser);

  const addMessage = (data: MessageFormData) => {
    // Create Date from time string
    const [hour, minute] = data.time.split(':').map(Number);
    const timestampDate = new Date();
    timestampDate.setHours(hour, minute, 0, 0);

    if (!currentUser || !otherUser) {
      console.error("Current user or other user is not set");
      return;
    }

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

  const addBulkMessages = (bulkData: BulkImportData) => {
    if (!currentUser || !otherUser) {
      console.error("Current user or other user is not set");
      return;
    }

    if (bulkData.length === 0) {
      return; // No messages to add
    }

    const newMessages: Message[] = bulkData.map((data, index) => {
      // Create Date from time string
      const [hour, minute] = data.time.split(':').map(Number);
      const timestampDate = new Date();
      timestampDate.setHours(hour, minute, 0, 0);

      const baseMessage = {
        id: (Date.now() + index).toString(), // Ensure unique IDs
        sender: data.isUserMessage ? currentUser : otherUser,
        timestamp: timestampDate,
        isUser: data.isUserMessage,
      };

      return data.type === "text"
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
    });

    setMessages((prev) => [...prev, ...newMessages]);
  };

  const editMessage = (id: string, data: Partial<MessageFormData>) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id !== id) return message;

        // Create updated timestamp if time is provided
        let timestamp = message.timestamp;
        if (data.time !== undefined) {
          const [hour, minute] = data.time.split(':').map(Number);
          timestamp = new Date(message.timestamp);
          timestamp.setHours(hour, minute, 0, 0);
        }

        // Update sender if isUserMessage changed
        let sender = message.sender;
        if (data.isUserMessage !== undefined) {
          sender = data.isUserMessage ? currentUser! : otherUser!;
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

  const updateUsers = (newCurrentUser: User, newOtherUser: User) => {
    setCurrentUser(newCurrentUser);
    setOtherUser(newOtherUser);

    // Update existing messages to use the new user information
    setMessages((prev) =>
      prev.map((message) => ({
        ...message,
        sender: message.isUser ? newCurrentUser : newOtherUser,
      }))
    );
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        currentUser,
        otherUser,
        addMessage,
        addBulkMessages,
        editMessage,
        deleteMessage,
        clearMessages,
        updateUsers,
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
