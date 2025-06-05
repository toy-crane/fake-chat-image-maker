import { StatusBar } from './StatusBar';
import { ChatHeader } from './ChatHeader';
import { MessageBubble } from './MessageBubble';
import { ImageMessage } from './ImageMessage';
import { ChatInput } from './ChatInput';
import { KakaoTalkChatProps } from './types';

export function KakaoTalkChat({ 
  messages, 
  currentUser, 
  chatTitle, 
  onSendMessage, 
  onAttach,
  className = "" 
}: KakaoTalkChatProps) {
  const renderMessage = (message: any) => {
    if (message.type === 'text') {
      return <MessageBubble key={message.id} message={message} />;
    } else if (message.type === 'image') {
      return <ImageMessage key={message.id} message={message} />;
    }
    return null;
  };

  return (
    <div className={`w-full max-w-sm mx-auto h-[844px] bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col ${className}`}>
      {/* Status Bar */}
      <StatusBar time="4:24" />

      {/* Chat Header */}
      <ChatHeader 
        title={chatTitle}
        onBack={() => console.log('Back clicked')}
        onSearch={() => console.log('Search clicked')}
        onMenu={() => console.log('Menu clicked')}
      />

      {/* Messages Area */}
      <div className="flex-1 bg-blue-100 p-4 overflow-y-auto">
        {messages.map(renderMessage)}
      </div>

      {/* Input Area */}
      <ChatInput 
        onSendMessage={onSendMessage}
        onAttach={onAttach}
        onEmoji={() => console.log('Emoji clicked')}
        onMore={() => console.log('More clicked')}
      />

      {/* Home Indicator */}
      <div className="bg-white pb-2 flex justify-center">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}