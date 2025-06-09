import { Mic, Plus } from "lucide-react";

export function AppleChatInput() {
  return (
    <div 
      data-testid="apple-input"
      className="bg-gray-50 px-4 py-2 border-t border-gray-200"
    >
      <div className="flex items-center space-x-2">
        <button
          className="p-2 rounded-full bg-gray-300 text-gray-600"
          aria-label="Add attachment"
        >
          <Plus className="w-5 h-5" />
        </button>

        <div className="flex-1 bg-white rounded-full border border-gray-300 px-4 py-2 flex items-center">
          <input
            type="text"
            placeholder="Text Message • SMS"
            className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-500"
            readOnly
          />
        </div>

        <button
          className="p-2 rounded-full text-gray-600"
          aria-label="Voice message"
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}