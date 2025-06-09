import { Plus, Smile, Hash } from "lucide-react";

const PLACEHOLDER_TEXT = "메시지를 입력하세요";

export function ChatInput() {
  return (
    <div className="bg-white p-3 border-t border-gray-200">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 flex items-center justify-center">
          <Plus className="w-5 h-5 text-gray-600" />
        </div>
        <div className="flex-1 bg-gray-100 rounded-full px-3 py-1.5">
          <div className="w-full bg-transparent text-gray-400 h-6 flex items-center">
            {PLACEHOLDER_TEXT}
          </div>
        </div>
        <div className="w-7 h-7 flex items-center justify-center">
          <Smile className="w-5 h-5 text-gray-600" />
        </div>
        <div className="w-7 h-7 flex items-center justify-center">
          <Hash className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </div>
  );
}
