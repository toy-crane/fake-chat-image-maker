"use client";

import { useRef } from "react";
import html2canvas from "html2canvas-pro";
import { Download } from "lucide-react";
import { KakaoTalkChat, MessageForm, ProfileForm } from "@/features/chat/components";
import { ChatProvider, useChatContext } from "@/contexts/ChatContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fake Chat Image Maker",
  description:
    "Generate realistic KakaoTalk chat screenshots with custom profiles and messages. Perfect for entertainment, presentations, and design mockups.",
  url: "https://fake-chat-maker.vercel.app",
  applicationCategory: "Entertainment",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: "Fake Chat Image Maker",
  },
  featureList: [
    "Create realistic KakaoTalk chat screenshots",
    "Custom user profiles and avatars",
    "Bulk message import via JSON",
    "High-quality PNG export",
    "Real-time chat preview",
    "Responsive design",
  ],
};

const HTML2CANVAS_CONFIG = {
  backgroundColor: "#ffffff",
  scale: 4,
  useCORS: true,
  allowTaint: true,
  width: 375,
  height: 844,
  logging: false,
};

function ChatInterface() {
  const {
    messages,
    addMessage,
    addBulkMessages,
    currentUser,
    otherUser,
    updateUsers,
    clearMessages,
  } = useChatContext();

  const chatRef = useRef<HTMLDivElement>(null);

  const downloadChatImage = async () => {
    if (!chatRef.current) return;

    try {
      const canvas = await html2canvas(chatRef.current, {
        ...HTML2CANVAS_CONFIG,
        onclone: (clonedDoc) => {
          // Force load high-resolution images in the cloned document
          const images = clonedDoc.getElementsByTagName("img");
          Array.from(images).forEach((img) => {
            // Remove srcset to prevent low-res selection
            img.removeAttribute("srcset");
            // Ensure crossorigin is set for external images
            img.setAttribute("crossorigin", "anonymous");
          });
        },
      });

      const link = document.createElement("a");
      link.download = `chat-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error("Error downloading chat image:", error);
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-background p-4 md:p-8 mt-16 pb-16 md:pb-36">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-3 mb-16">
            <h1 className="text-6xl font-bold tracking-tight">
              Fake Chat Message Generator
            </h1>
            <p className="text-muted-foreground text-2xl">
              Create realistic chat conversations with custom profiles and
              messages
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-3xl mx-auto">
              <p className="text-amber-800 text-sm font-medium">
                ⚠️ For entertainment purposes only. <br />
                Please use responsibly and do not use this tool to deceive,
                harm, or mislead others.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-16 md:gap-8">
            {/* Configuration Panel */}
            <div className="xl:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Chat Setup</CardTitle>
                    <Button
                      onClick={downloadChatImage}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Image
                    </Button>
                  </div>
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
                        onAddBulkMessages={addBulkMessages}
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
              <div
                className="sticky top-8"
                ref={chatRef}
              >
                <KakaoTalkChat
                  messages={messages}
                  chatTitle={otherUser?.name || ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <ChatProvider initialMessages={[]}>
      <ChatInterface />
    </ChatProvider>
  );
}
