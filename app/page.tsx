'use client';

import { useState, useCallback } from 'react';
import { KakaoTalkChat, Message, User } from '../components/kakao';
import { MessageForm } from '../components/MessageForm';
import { MessageFormData } from '@/lib/schemas/message';

export default function Home() {
  // Sample data
  const currentUser: User = {
    id: 'current-user',
    name: '나'
  };

  const otherUser: User = {
    id: 'yuna',
    name: '유나',
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23f0f0f0'/%3E%3Ctext x='20' y='26' text-anchor='middle' fill='%23999' font-size='14'%3E유나%3C/text%3E%3C/svg%3E"
  };

  const initialMessages: Message[] = [
    {
      id: '1',
      type: 'image',
      imageUrl: '/sample-attachment.png',
      alt: 'AI Supper Hero attachment',
      sender: otherUser,
      timestamp: '11:30 AM',
      isUser: false
    },
    {
      id: '2',
      type: 'image',
      imageUrl: '/sample-attachment.png',
      alt: 'User image attachment',
      sender: currentUser,
      timestamp: '11:40 AM',
      isUser: true
    },
    {
      id: '3',
      type: 'text',
      content: '잠실 도착이요',
      sender: currentUser,
      timestamp: '11:42 AM',
      isUser: true
    },
    {
      id: '4',
      type: 'text',
      content: '이약이 분유 다 먹었나요?',
      sender: currentUser,
      timestamp: '3:19 PM',
      isUser: true
    },
    {
      id: '5',
      type: 'text',
      content: '생님 베이글 사갈까영?',
      sender: currentUser,
      timestamp: '3:20 PM',
      isUser: true
    },
    {
      id: '6',
      type: 'text',
      content: '이제받네요 ㅎ ㅎ',
      sender: otherUser,
      timestamp: '4:11 PM',
      isUser: false
    },
    {
      id: '7',
      type: 'text',
      content: '이약이 잘고있어영',
      sender: otherUser,
      timestamp: '4:11 PM',
      isUser: false
    },
    {
      id: '8',
      type: 'text',
      content: '저도 갈이 잦으요',
      sender: otherUser,
      timestamp: '4:11 PM',
      isUser: false
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleAddMessage = useCallback((data: MessageFormData) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: data.content,
      sender: data.isUserMessage ? currentUser : otherUser,
      timestamp: data.timestamp || new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      isUser: data.isUserMessage,
    };

    setMessages(prev => [...prev, newMessage]);
  }, [currentUser, otherUser]);

  const handleSendMessage = (message: string) => {
    handleAddMessage({
      content: message,
      isUserMessage: true,
    });
  };

  const handleAttach = () => {
    console.log('Attach clicked');
    // Here you would typically open file picker
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Fake Chat Message Generator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Message Form */}
          <div className="space-y-6">
            <MessageForm 
              onAddMessage={handleAddMessage}
              currentUserName={currentUser.name}
              otherUserName={otherUser.name}
            />
          </div>
          
          {/* Chat Preview */}
          <div className="flex justify-center">
            <KakaoTalkChat
              messages={messages}
              currentUser={currentUser}
              chatTitle={otherUser.name}
              onSendMessage={handleSendMessage}
              onAttach={handleAttach}
            />
          </div>
        </div>
      </div>
    </div>
  );
}