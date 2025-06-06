"use client";

import { KakaoTalkChat } from "../components/kakao";
import { MessageForm } from "../components/MessageForm";
import { ProfileForm } from "../components/ProfileForm";
import { ChatProvider, useChatContext } from "@/lib/contexts/ChatContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ChatInterface() {
  const {
    messages,
    addMessage,
    currentUser,
    otherUser,
    updateUsers,
    clearMessages,
  } = useChatContext();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Fake Chat Message Generator
          </h1>
          <p className="text-muted-foreground">
            Create realistic chat conversations with custom profiles and
            messages
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Configuration Panel */}
          <div className="xl:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Chat Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="profiles">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profiles">Profiles</TabsTrigger>
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="profiles"
                    className="mt-6"
                  >
                    <ProfileForm
                      currentUser={currentUser}
                      otherUser={otherUser}
                      onUpdateUsers={updateUsers}
                    />
                  </TabsContent>

                  <TabsContent
                    value="messages"
                    className="mt-6"
                  >
                    <MessageForm
                      onAddMessage={addMessage}
                      currentUserName={currentUser?.name}
                      otherUserName={otherUser?.name}
                      onClearMessages={clearMessages}
                      messagesCount={messages.length}
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
                chatTitle={otherUser?.name || ""}
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
    <ChatProvider initialMessages={[]}>
      <ChatInterface />
    </ChatProvider>
  );
}
