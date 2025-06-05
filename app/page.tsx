'use client';

import { KakaoTalkChat, Message, User } from '../components/kakao';

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

  const messages: Message[] = [
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

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    // Here you would typically add the message to your state
  };

  const handleAttach = () => {
    console.log('Attach clicked');
    // Here you would typically open file picker
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <KakaoTalkChat
        messages={messages}
        currentUser={currentUser}
        chatTitle="유나"
        onSendMessage={handleSendMessage}
        onAttach={handleAttach}
      />
    </div>
  );
}