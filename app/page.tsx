"use client";

import { KakaoTalkChat, Message, User } from "../components/kakao";
import { MessageForm } from "../components/MessageForm";
import { ChatProvider, useChatContext } from "@/lib/contexts/ChatContext";

// Sample data
const currentUser: User = {
  id: "current-user",
  name: "나",
};

const otherUser: User = {
  id: "yuna",
  name: "유나",
  avatar:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23f0f0f0'/%3E%3Ctext x='20' y='26' text-anchor='middle' fill='%23999' font-size='14'%3E유나%3C/text%3E%3C/svg%3E",
};

const initialMessages: Message[] = [
  {
    id: "1",
    type: "image",
    imageUrl: "/sample-attachment.png",
    alt: "AI Supper Hero attachment",
    sender: otherUser,
    timestamp: new Date(new Date().setHours(11, 30)),
    isUser: false,
  },
  {
    id: "2",
    type: "image",
    imageUrl: "/sample-attachment.png",
    alt: "User image attachment",
    sender: currentUser,
    timestamp: new Date(new Date().setHours(11, 40)),
    isUser: true,
  },
  {
    id: "3",
    type: "text",
    content: "잠실 도착이요",
    sender: currentUser,
    timestamp: new Date(new Date().setHours(11, 42)),
    isUser: true,
  },
  {
    id: "4",
    type: "text",
    content: "이약이 분유 다 먹었나요?",
    sender: currentUser,
    timestamp: new Date(new Date().setHours(15, 19)),
    isUser: true,
  },
  {
    id: "5",
    type: "text",
    content: "생님 베이글 사갈까영?",
    sender: currentUser,
    timestamp: new Date(new Date().setHours(15, 20)),
    isUser: true,
  },
  {
    id: "6",
    type: "text",
    content: "이제받네요 ㅎ ㅎ",
    sender: otherUser,
    timestamp: new Date(new Date().setHours(16, 11)),
    isUser: false,
  },
  {
    id: "7",
    type: "text",
    content: "이약이 잘고있어영",
    sender: otherUser,
    timestamp: new Date(new Date().setHours(16, 11)),
    isUser: false,
  },
  {
    id: "8",
    type: "text",
    content: "저도 갈이 잦으요",
    sender: otherUser,
    timestamp: new Date(new Date().setHours(16, 11)),
    isUser: false,
  },
];

function ChatInterface() {
  const { messages, addMessage, currentUser, otherUser } = useChatContext();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Fake Chat Message Generator
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Message Form */}
          <div className="space-y-6">
            <MessageForm
              onAddMessage={addMessage}
              currentUserName={currentUser.name}
              otherUserName={otherUser.name}
            />
          </div>

          {/* Chat Preview */}
          <div className="flex justify-center">
            <KakaoTalkChat
              messages={messages}
              chatTitle={otherUser.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ChatProvider
      initialMessages={initialMessages}
      currentUser={currentUser}
      otherUser={otherUser}
    >
      <ChatInterface />
    </ChatProvider>
  );
}
