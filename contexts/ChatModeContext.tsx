"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ChatMode } from "@/features/chat/components/types";

interface ChatModeContextType {
  chatMode: ChatMode;
  setChatMode: (mode: ChatMode) => void;
}

const ChatModeContext = createContext<ChatModeContextType | undefined>(undefined);

interface ChatModeProviderProps {
  children: ReactNode;
  initialMode?: ChatMode;
}

export function ChatModeProvider({
  children,
  initialMode = "kakaotalk",
}: ChatModeProviderProps) {
  const [chatMode, setChatMode] = useState<ChatMode>(initialMode);

  return (
    <ChatModeContext.Provider
      value={{
        chatMode,
        setChatMode,
      }}
    >
      {children}
    </ChatModeContext.Provider>
  );
}

export function useChatModeContext() {
  const context = useContext(ChatModeContext);
  if (context === undefined) {
    throw new Error("useChatModeContext must be used within a ChatModeProvider");
  }
  return context;
}