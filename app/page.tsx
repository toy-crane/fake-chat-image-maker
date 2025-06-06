"use client";

import { KakaoTalkChat, Message, User } from "../components/kakao";
import { MessageForm } from "../components/MessageForm";
import { ProfileForm } from "../components/ProfileForm";
import { ChatProvider, useChatContext } from "@/lib/contexts/ChatContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const { messages, addMessage, currentUser, otherUser, updateUsers } = useChatContext();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Fake Chat Message Generator
          </h1>
          <p className="text-muted-foreground">
            Create realistic chat conversations with custom profiles and messages
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Configuration Panel */}
          <div className="xl:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Chat Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="profiles">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profiles">Profiles</TabsTrigger>
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profiles" className="mt-6">
                    <ProfileForm
                      currentUser={currentUser}
                      otherUser={otherUser}
                      onUpdateUsers={updateUsers}
                    />
                  </TabsContent>

                  <TabsContent value="messages" className="mt-6">
                    <MessageForm
                      onAddMessage={addMessage}
                      currentUserName={currentUser.name}
                      otherUserName={otherUser.name}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Chat Preview */}
          <div className="xl:col-span-2 flex justify-center xl:justify-start">
            <div className="sticky top-8">
              <KakaoTalkChat
                messages={messages}
                chatTitle={otherUser.name}
              />
            </div>
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
