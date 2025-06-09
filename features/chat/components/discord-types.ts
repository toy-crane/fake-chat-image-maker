import { Message } from "./types";

export interface DiscordChatProps {
  messages: Message[];
  channelName: string;
  serverName: string;
  className?: string;
}

export interface DiscordMessageProps {
  message: Message;
  showSenderInfo?: boolean;
  showTimestamp?: boolean;
}

export interface DiscordHeaderProps {
  channelName: string;
  serverName: string;
  memberCount?: number;
}

export interface DiscordInputProps {
  channelName: string;
  onSendMessage?: (message: string) => void;
  onAttach?: () => void;
  onEmoji?: () => void;
  placeholder?: string;
}