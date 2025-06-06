import { Plus, Smile, Hash } from 'lucide-react';
import { ChatInputProps } from './types';

export function ChatInput({ 
  placeholder = "Enter a message" 
}: Partial<ChatInputProps>) {
  return (
    <div className="bg-white p-4 border-t border-gray-200">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center">
          <Plus className="w-6 h-6 text-gray-600" />
        </div>
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
          <input 
            type="text" 
            placeholder={placeholder}
            className="w-full bg-transparent border-none outline-none text-gray-600"
            readOnly
          />
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <Smile className="w-6 h-6 text-gray-600" />
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <Hash className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </div>
  );
}