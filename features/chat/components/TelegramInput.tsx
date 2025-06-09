import { Paperclip, Mic } from "lucide-react";
import { ChatInputProps } from "./types";

export function TelegramInput({
  placeholder = "Message",
}: ChatInputProps) {
  return (
    <div className="bg-gray-100 px-3 py-2 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <div className="p-2">
          <Paperclip className="w-5 h-5 text-gray-500" />
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full bg-white rounded-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="p-2">
          <Mic className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </div>
  );
}