export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface TextMessage {
  id: string;
  type: 'text';
  content: string;
  sender: User;
  timestamp: Date;
  isUser: boolean;
}

export interface ImageMessage {
  id: string;
  type: 'image';
  imageUrl: string;
  alt: string;
  sender: User;
  timestamp: Date;
  isUser: boolean;
}

export type Message = TextMessage | ImageMessage;

export interface StatusBarProps {
  time: string;
}

export interface ChatHeaderProps {
  title: string;
}

export interface MessageBubbleProps {
  message: TextMessage;
  showSenderInfo?: boolean;
  showTimestamp?: boolean;
}

export interface ImageMessageProps {
  message: ImageMessage;
}

export interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  onAttach?: () => void;
  onEmoji?: () => void;
  onMore?: () => void;
  placeholder?: string;
}

export interface KakaoTalkChatProps {
  messages: Message[];
  chatTitle: string;
  className?: string;
}