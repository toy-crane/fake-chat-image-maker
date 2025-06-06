import { ChevronLeft, Search, Menu } from 'lucide-react';
import { ChatHeaderProps } from './types';

export function ChatHeader({ title }: ChatHeaderProps) {
  return (
    <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="p-1">
          <ChevronLeft className="w-6 h-6" />
        </div>
        <span className="text-lg font-medium text-black">{title}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="p-1">
          <Search className="w-6 h-6" />
        </div>
        <div className="p-1">
          <Menu className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}