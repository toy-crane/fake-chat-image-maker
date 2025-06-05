import { Plus, Smile, Hash } from 'lucide-react';
import { ChatInputProps } from './types';
import { useState } from 'react';

export function ChatInput({ 
  onSendMessage, 
  onAttach, 
  onEmoji, 
  onMore, 
  placeholder = "Enter a message" 
}: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSendMessage) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="bg-white p-4 border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <button 
          type="button" 
          onClick={onAttach}
          className="w-8 h-8 flex items-center justify-center"
        >
          <Plus className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent border-none outline-none text-gray-600"
          />
        </div>
        <button 
          type="button" 
          onClick={onEmoji}
          className="w-8 h-8 flex items-center justify-center"
        >
          <Smile className="w-6 h-6 text-gray-600" />
        </button>
        <button 
          type="button" 
          onClick={onMore}
          className="w-8 h-8 flex items-center justify-center"
        >
          <Hash className="w-6 h-6 text-gray-600" />
        </button>
      </form>
    </div>
  );
}